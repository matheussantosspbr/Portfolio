// Rate limiter simples por janela fixa (fixed-window), em memória.
// Adequado a um processo único (Docker/VPS, single container). Para
// multi-container, trocar `createMemoryRateLimiter` por uma implementação
// baseada em Redis mantendo a mesma interface `RateLimiter`.

export interface RateLimitResult {
  allowed: boolean;
  /** requisições restantes na janela atual */
  remaining: number;
  /** segundos até a janela resetar (0 quando `allowed`) */
  retryAfter: number;
}

export interface RateLimiter {
  // Aceita retorno síncrono (memória) ou assíncrono (ex.: Redis no futuro),
  // para permitir trocar o store sem alterar as route handlers.
  consume(
    key: string,
    limit: number,
    windowMs: number,
  ): RateLimitResult | Promise<RateLimitResult>;
}

interface Bucket {
  count: number;
  resetAt: number;
}

/** Evita crescimento ilimitado do Map em caso de muitos IPs distintos. */
const MAX_BUCKETS = 10_000;

export function createMemoryRateLimiter(
  now: () => number = Date.now,
): RateLimiter {
  const buckets = new Map<string, Bucket>();

  return {
    consume(key, limit, windowMs) {
      const t = now();
      const bucket = buckets.get(key);

      // janela nova (inexistente ou expirada)
      if (!bucket || t >= bucket.resetAt) {
        if (buckets.size >= MAX_BUCKETS) {
          for (const [k, b] of buckets) {
            if (t >= b.resetAt) buckets.delete(k);
          }
        }
        buckets.set(key, { count: 1, resetAt: t + windowMs });
        return { allowed: true, remaining: limit - 1, retryAfter: 0 };
      }

      // dentro da janela, limite estourado
      if (bucket.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfter: Math.ceil((bucket.resetAt - t) / 1000),
        };
      }

      // dentro da janela, ainda permitido
      bucket.count += 1;
      return { allowed: true, remaining: limit - bucket.count, retryAfter: 0 };
    },
  };
}

/** Instância padrão usada pela aplicação. */
export const rateLimiter = createMemoryRateLimiter();

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
