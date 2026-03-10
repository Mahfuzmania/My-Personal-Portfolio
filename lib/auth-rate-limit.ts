type Attempt = {
  count: number;
  windowStart: number;
  blockedUntil: number;
};

const ATTEMPTS = new Map<string, Attempt>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const BLOCK_MS = 15 * 60 * 1000;

export function assertLoginAllowed(key: string) {
  const now = Date.now();
  const current = ATTEMPTS.get(key);

  if (!current) {
    ATTEMPTS.set(key, { count: 0, windowStart: now, blockedUntil: 0 });
    return;
  }

  if (current.blockedUntil > now) {
    const waitSeconds = Math.ceil((current.blockedUntil - now) / 1000);
    throw new Error(`Too many login attempts. Retry in ${waitSeconds} seconds.`);
  }

  if (now - current.windowStart > WINDOW_MS) {
    ATTEMPTS.set(key, { count: 0, windowStart: now, blockedUntil: 0 });
  }
}

export function registerLoginFailure(key: string) {
  const now = Date.now();
  const current = ATTEMPTS.get(key) ?? { count: 0, windowStart: now, blockedUntil: 0 };

  if (now - current.windowStart > WINDOW_MS) {
    current.count = 0;
    current.windowStart = now;
  }

  current.count += 1;

  if (current.count >= MAX_ATTEMPTS) {
    current.blockedUntil = now + BLOCK_MS;
  }

  ATTEMPTS.set(key, current);
}

export function registerLoginSuccess(key: string) {
  ATTEMPTS.delete(key);
}
