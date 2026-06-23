import { timingSafeEqual } from "node:crypto";

// Validação de API key via header `x-api-key` contra a env `API_KEY`.
// Destinada a consumidores externos / server-to-server. NÃO deve ser usada pelo
// frontend (uma key no browser não é secreta — use checagem de origem).

/** `true` somente se `x-api-key` === `API_KEY` (comparação tempo-constante). */
export function isValidApiKey(request: Request): boolean {
  const expected = process.env.API_KEY;
  if (!expected) return false; // sem key configurada → nega por segurança

  const provided = request.headers.get("x-api-key");
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false; // evita throw do timingSafeEqual

  return timingSafeEqual(a, b);
}
