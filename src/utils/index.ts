import slugify from "slugify";

// Hapus Undefined untuk Update
export function removeUndefined(obj: any) {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

// Generate Slug
export function generateSlug(title: string): string {
  const base = slugify(title, { lower: true, strict: true });

  return `${base}-${Date.now()}`;
}
