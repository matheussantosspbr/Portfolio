// Checagem de origem (Origin/Referer) contra uma allowlist.
// É a proteção real para o frontend same-origin (browser), já que uma API key
// embutida no cliente não seria secreta.

const DEFAULT_ORIGINS = [
  "https://matheussantos.tech",
  "https://www.matheussantos.tech",
  "http://localhost:3000",
];

/**
 * Origens permitidas. Lê `ALLOWED_ORIGINS` (CSV) em tempo de execução; cai para
 * os defaults (produção + localhost em dev) quando a env não está definida.
 */
export function getAllowedOrigins(): string[] {
  const env = process.env.ALLOWED_ORIGINS;
  if (env?.trim()) {
    return env
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return DEFAULT_ORIGINS;
}

/**
 * `true` se a requisição vem de uma origem permitida. Usa o header `Origin` e,
 * na ausência dele, tenta derivar a origem do `Referer`. Sem nenhum dos dois
 * (típico de chamadas não-browser), retorna `false`.
 */
export function isAllowedOrigin(request: Request): boolean {
  const allowed = getAllowedOrigins();

  const origin = request.headers.get("origin");
  if (origin) return allowed.includes(origin);

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return allowed.includes(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return false;
}
