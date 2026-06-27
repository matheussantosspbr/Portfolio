import { timingSafeEqual } from "node:crypto";

export function isValidApiKey(request: Request): boolean {
  const expected = process.env.API_KEY;
  if (!expected) return false;

  const provided = request.headers.get("x-api-key");
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}
