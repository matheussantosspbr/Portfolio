import { NextResponse } from "next/server";
import { isValidApiKey } from "./api-key";
import { isAllowedOrigin } from "./origin";
import { getClientIp, type RateLimiter, rateLimiter } from "./rate-limit";

export interface GuardOptions {
  requireApiKey?: boolean;
  limit?: number;
  windowMs?: number;
  limiter?: RateLimiter;
}

export async function withApiGuard(
  request: Request,
  options: GuardOptions = {},
): Promise<NextResponse | null> {
  const {
    requireApiKey = false,
    limit = 5,
    windowMs = 60_000,
    limiter = rateLimiter,
  } = options;

  const result = await limiter.consume(getClientIp(request), limit, windowMs);
  if (!result.allowed) {
    return NextResponse.json(
      { error: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(result.retryAfter) } },
    );
  }

  if (requireApiKey) {
    if (!isValidApiKey(request)) {
      return NextResponse.json({ error: "INVALID_API_KEY" }, { status: 401 });
    }
  } else if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "ORIGIN_NOT_ALLOWED" }, { status: 403 });
  }

  return null;
}
