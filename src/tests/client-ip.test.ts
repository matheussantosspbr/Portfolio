import { describe, expect, it } from "vitest";
import { getClientIp } from "../server/http/client-ip";

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
