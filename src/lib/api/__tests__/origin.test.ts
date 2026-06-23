import { afterEach, describe, expect, it } from "vitest";
import { getAllowedOrigins, isAllowedOrigin } from "../origin";

afterEach(() => {
  delete process.env.ALLOWED_ORIGINS;
});

describe("getAllowedOrigins", () => {
  it("usa defaults quando a env não está definida", () => {
    expect(getAllowedOrigins()).toContain("http://localhost:3000");
  });

  it("faz parse de ALLOWED_ORIGINS (CSV)", () => {
    process.env.ALLOWED_ORIGINS = "https://a.com, https://b.com";
    expect(getAllowedOrigins()).toEqual(["https://a.com", "https://b.com"]);
  });
});

describe("isAllowedOrigin", () => {
  it("permite origem na allowlist", () => {
    process.env.ALLOWED_ORIGINS = "https://a.com";
    const req = new Request("http://x", {
      headers: { origin: "https://a.com" },
    });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("bloqueia origem fora da allowlist", () => {
    process.env.ALLOWED_ORIGINS = "https://a.com";
    const req = new Request("http://x", {
      headers: { origin: "https://evil.com" },
    });
    expect(isAllowedOrigin(req)).toBe(false);
  });

  it("deriva a origem do Referer quando não há Origin", () => {
    process.env.ALLOWED_ORIGINS = "https://a.com";
    const req = new Request("http://x", {
      headers: { referer: "https://a.com/contato" },
    });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("bloqueia sem Origin nem Referer", () => {
    process.env.ALLOWED_ORIGINS = "https://a.com";
    expect(isAllowedOrigin(new Request("http://x"))).toBe(false);
  });
});
