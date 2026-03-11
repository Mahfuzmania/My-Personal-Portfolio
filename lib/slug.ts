export function slugify(input: string) {
  const compacted = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return compacted.length > 0 ? compacted : `item-${Date.now()}`;
}

export function ensureUniqueSlug(slug: string, existing: Iterable<string>) {
  const current = new Set(existing);
  if (!current.has(slug)) {
    return slug;
  }

  let counter = 2;
  let candidate = `${slug}-${counter}`;
  while (current.has(candidate)) {
    counter += 1;
    candidate = `${slug}-${counter}`;
  }

  return candidate;
}
