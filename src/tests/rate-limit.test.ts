import { describe, expect, it } from "vitest";
import { createMemoryRateLimiter, getClientIp } from "../app/api/middleware/rate-limit";

describe("createMemoryRateLimiter", () => {
  it("permite requisições dentro do limite", () => {
    const limiter = createMemoryRateLimiter(() => 0);
    expect(limiter.consume("ip", 3, 1000)).toMatchObject({
      allowed: true,
      remaining: 2,
    });
    expect(limiter.consume("ip", 3, 1000)).toMatchObject({
      allowed: true,
      remaining: 1,
    });
    expect(limiter.consume("ip", 3, 1000)).toMatchObject({
      allowed: true,
      remaining: 0,
    });
  });

  it("bloqueia ao estourar o limite e informa retryAfter", () => {
    const limiter = createMemoryRateLimiter(() => 0);
    limiter.consume("ip", 2, 60_000);
    limiter.consume("ip", 2, 60_000);
    const blocked = limiter.consume("ip", 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfter).toBe(60);
  });

  it("reseta a contagem quando a janela expira", () => {
    let now = 0;
    const limiter = createMemoryRateLimiter(() => now);
    limiter.consume("ip", 1, 1000);
    expect(limiter.consume("ip", 1, 1000).allowed).toBe(false);
    now = 1000; // janela expirou
    expect(limiter.consume("ip", 1, 1000).allowed).toBe(true);
  });

  it("conta chaves (IPs) de forma independente", () => {
    const limiter = createMemoryRateLimiter(() => 0);
    limiter.consume("a", 1, 1000);
    expect(limiter.consume("a", 1, 1000).allowed).toBe(false);
    expect(limiter.consume("b", 1, 1000).allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  it("usa o primeiro IP de x-forwarded-for", () => {
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "1.1.1.1, 2.2.2.2" },
    });
    expect(getClientIp(req)).toBe("1.1.1.1");
  });

  it("cai para x-real-ip", () => {
    const req = new Request("http://x", {
      headers: { "x-real-ip": "3.3.3.3" },
    });
    expect(getClientIp(req)).toBe("3.3.3.3");
  });

  it("retorna 'unknown' sem headers", () => {
    expect(getClientIp(new Request("http://x"))).toBe("unknown");
  });
});
