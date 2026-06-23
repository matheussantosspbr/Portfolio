import { describe, expect, it } from "vitest";
import { ALLOWED_ORIGINS, isAllowedOrigin } from "../origin";

const OK = ALLOWED_ORIGINS[0]; // origem permitida pela allowlist do código

describe("isAllowedOrigin", () => {
  it("permite origem na allowlist", () => {
    const req = new Request("http://x", { headers: { origin: OK } });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("bloqueia origem fora da allowlist", () => {
    const req = new Request("http://x", {
      headers: { origin: "https://evil.com" },
    });
    expect(isAllowedOrigin(req)).toBe(false);
  });

  it("deriva a origem do Referer quando não há Origin", () => {
    const req = new Request("http://x", {
      headers: { referer: `${OK}/contato` },
    });
    expect(isAllowedOrigin(req)).toBe(true);
  });

  it("bloqueia sem Origin nem Referer", () => {
    expect(isAllowedOrigin(new Request("http://x"))).toBe(false);
  });
});
