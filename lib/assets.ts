/**
 * Prefix a root-relative asset path with the GitHub Pages basePath.
 * Next.js only rewrites <Link>/next-image URLs, not raw <img> src.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
