export const HONEYPOT_FIELD = "website";
export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
