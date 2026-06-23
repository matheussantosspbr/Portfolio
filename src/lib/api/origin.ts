// Checagem de origem (Origin/Referer) contra uma allowlist.
// É a proteção real para o frontend same-origin (browser), já que uma API key
// embutida no cliente não seria secreta.

// Allowlist fixa no código (não vem de env). Para adicionar/remover uma origem,
// edite esta lista.
export const ALLOWED_ORIGINS = [
  "https://matheussantos.tech",
  "https://www.matheussantos.tech",
  "http://localhost:3000",
];

/**
 * `true` se a requisição vem de uma origem permitida. Usa o header `Origin` e,
 * na ausência dele, tenta derivar a origem do `Referer`. Sem nenhum dos dois
 * (típico de chamadas não-browser), retorna `false`.
 */
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
