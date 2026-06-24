/**
 * Extrai o IP do cliente. Atrás de um reverse proxy (Docker/VPS), o IP real
 * vem em `x-forwarded-for` (primeiro da lista). O proxy precisa repassar esse
 * header. Cai para `x-real-ip` e, por fim, "unknown".
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
