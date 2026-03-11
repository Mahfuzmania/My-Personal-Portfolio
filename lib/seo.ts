export function getSiteUrl() {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000");
}

export function buildAbsoluteUrl(pathname: string) {
  const base = getSiteUrl();
  return new URL(pathname.startsWith("/") ? pathname : `/${pathname}`, base).toString();
}
