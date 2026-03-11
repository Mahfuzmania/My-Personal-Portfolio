type RateLimitRecord = {
  requestCount: number;
  blockedUntil: number;
  windowStart: number;
};

const RATE_LIMIT_MAP = new Map<string, RateLimitRecord>();

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
  blockMs: number;
};

const defaultOptions: RateLimitOptions = {
  windowMs: 10 * 60 * 1000,
  maxRequests: 8,
  blockMs: 10 * 60 * 1000,
};

function resolveIpFromRequest(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  const cloudIp = request.headers.get("cf-connecting-ip");
  if (cloudIp) {
    return cloudIp;
  }

  return "unknown";
}

export function getRequestKey(request: Request, fallback = "unknown") {
  return resolveIpFromRequest(request) ?? fallback;
}

export function assertRateLimit(key: string, options: Partial<RateLimitOptions> = {}) {
  const config = { ...defaultOptions, ...options };
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(key) ?? {
    requestCount: 0,
    blockedUntil: 0,
    windowStart: now,
  };

  if (record.blockedUntil > now) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    throw new Error(`Rate limit exceeded. Retry in ${retryAfter} seconds.`);
  }

  if (now - record.windowStart > config.windowMs) {
    record.requestCount = 0;
    record.windowStart = now;
    record.blockedUntil = 0;
  }

  record.requestCount += 1;

  if (record.requestCount > config.maxRequests) {
    record.blockedUntil = now + config.blockMs;
    RATE_LIMIT_MAP.set(key, record);
    throw new Error("Too many attempts. Please retry later.");
  }

  RATE_LIMIT_MAP.set(key, record);
}
