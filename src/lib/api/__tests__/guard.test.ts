import { afterEach, describe, expect, it } from "vitest";
import { withApiGuard } from "../guard";
import { createMemoryRateLimiter } from "../rate-limit";

afterEach(() => {
  delete process.env.API_KEY;
});

// origem fixa permitida pela allowlist do código (src/lib/api/origin.ts)
const OK_ORIGIN = "http://localhost:3000";

function req(headers: Record<string, string> = {}): Request {
  return new Request("http://x/api/test", { method: "POST", headers });
}

describe("withApiGuard", () => {
  it("libera (null) requisição de origem permitida dentro do limite", async () => {
    const blocked = await withApiGuard(req({ origin: OK_ORIGIN }));
    expect(blocked).toBeNull();
  });

  it("retorna 403 para origem não permitida", async () => {
    const res = await withApiGuard(req({ origin: "https://evil.com" }));
    expect(res?.status).toBe(403);
    expect(await res?.json()).toEqual({ error: "ORIGIN_NOT_ALLOWED" });
  });

  it("retorna 429 + Retry-After ao estourar o limite", async () => {
    const limiter = createMemoryRateLimiter(() => 0);
    const opts = { limit: 1, windowMs: 60_000, limiter };
    await withApiGuard(req({ origin: OK_ORIGIN }), opts);
    const res = await withApiGuard(req({ origin: OK_ORIGIN }), opts);
    expect(res?.status).toBe(429);
    expect(res?.headers.get("Retry-After")).toBe("60");
    expect(await res?.json()).toEqual({ error: "RATE_LIMITED" });
  });

  it("rate limit é checado antes da origem", async () => {
    const limiter = createMemoryRateLimiter(() => 0);
    const opts = { limit: 1, windowMs: 60_000, limiter };
    // 1ª passa pela origem inválida (403), 2ª já estoura o limite (429)
    await withApiGuard(req({ origin: "https://evil.com" }), opts);
    const res = await withApiGuard(req({ origin: "https://evil.com" }), opts);
    expect(res?.status).toBe(429);
  });

  it("com requireApiKey: 401 sem key válida", async () => {
    process.env.API_KEY = "secret";
    const res = await withApiGuard(req(), { requireApiKey: true });
    expect(res?.status).toBe(401);
    expect(await res?.json()).toEqual({ error: "INVALID_API_KEY" });
  });

  it("com requireApiKey: libera com key correta (ignora origem)", async () => {
    process.env.API_KEY = "secret";
    const blocked = await withApiGuard(req({ "x-api-key": "secret" }), {
      requireApiKey: true,
    });
    expect(blocked).toBeNull();
  });
});
