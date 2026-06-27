export const ALLOWED_ORIGINS = [
  "https://matheussantos.tech",
  "https://www.matheussantos.tech",
  "http://localhost:3000",
];

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) return ALLOWED_ORIGINS.includes(origin);

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return ALLOWED_ORIGINS.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return false;
}
