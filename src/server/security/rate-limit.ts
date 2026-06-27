export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
}

export interface RateLimiter {
  consume(
    key: string,
    limit: number,
    windowMs: number,
  ): RateLimitResult | Promise<RateLimitResult>;
}

export interface SyncRateLimiter extends RateLimiter {
  consume(key: string, limit: number, windowMs: number): RateLimitResult;
}

interface Bucket {
  count: number;
  resetAt: number;
}

const MAX_BUCKETS = 10_000;

export function createMemoryRateLimiter(
  now: () => number = Date.now,
): SyncRateLimiter {
  const buckets = new Map<string, Bucket>();

  return {
    consume(key, limit, windowMs) {
      const t = now();
      const bucket = buckets.get(key);

      if (!bucket || t >= bucket.resetAt) {
        if (buckets.size >= MAX_BUCKETS) {
          for (const [k, b] of buckets) {
            if (t >= b.resetAt) buckets.delete(k);
          }
        }
        buckets.set(key, { count: 1, resetAt: t + windowMs });
        return { allowed: true, remaining: limit - 1, retryAfter: 0 };
      }

      if (bucket.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfter: Math.ceil((bucket.resetAt - t) / 1000),
        };
      }

      bucket.count += 1;
      return { allowed: true, remaining: limit - bucket.count, retryAfter: 0 };
    },
  };
}

export const rateLimiter = createMemoryRateLimiter();
