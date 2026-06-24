import { describe, expect, it } from "vitest";
import { HONEYPOT_FIELD, isHoneypotTriggered } from "../lib/api/honeypot";

describe("isHoneypotTriggered", () => {
  it("retorna false quando o campo está vazio/ausente", () => {
    expect(isHoneypotTriggered({})).toBe(false);
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "" })).toBe(false);
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("retorna true quando o campo veio preenchido (bot)", () => {
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "http://spam" })).toBe(true);
  });
});
