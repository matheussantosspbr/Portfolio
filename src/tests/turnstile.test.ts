import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "../lib/api/turnstile";

afterEach(() => {
  delete process.env.TURNSTILE_SECRET_KEY;
  vi.restoreAllMocks();
});

function mockFetch(success: boolean) {
  return vi.fn().mockResolvedValue({
    json: async () => ({ success }),
  } as Response);
}

describe("verifyTurnstile", () => {
  it("retorna false sem secret configurada", async () => {
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("retorna false sem token", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    expect(await verifyTurnstile(undefined)).toBe(false);
  });

  it("retorna true quando a Cloudflare confirma", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.stubGlobal("fetch", mockFetch(true));
    expect(await verifyTurnstile("token", "1.2.3.4")).toBe(true);
  });

  it("retorna false quando a Cloudflare recusa", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.stubGlobal("fetch", mockFetch(false));
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("falha fechada em erro de rede", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    expect(await verifyTurnstile("token")).toBe(false);
  });
});
