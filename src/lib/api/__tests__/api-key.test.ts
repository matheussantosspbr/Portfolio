import { afterEach, describe, expect, it } from "vitest";
import { isValidApiKey } from "../api-key";

afterEach(() => {
  delete process.env.API_KEY;
});

function reqWithKey(key?: string): Request {
  return new Request("http://x", {
    headers: key ? { "x-api-key": key } : {},
  });
}

describe("isValidApiKey", () => {
  it("aceita key correta", () => {
    process.env.API_KEY = "secret-123";
    expect(isValidApiKey(reqWithKey("secret-123"))).toBe(true);
  });

  it("rejeita key incorreta", () => {
    process.env.API_KEY = "secret-123";
    expect(isValidApiKey(reqWithKey("wrong"))).toBe(false);
  });

  it("rejeita quando o header está ausente", () => {
    process.env.API_KEY = "secret-123";
    expect(isValidApiKey(reqWithKey())).toBe(false);
  });

  it("rejeita quando API_KEY não está configurada", () => {
    expect(isValidApiKey(reqWithKey("qualquer"))).toBe(false);
  });
});
