/**
 * Resolves static asset paths so they work reliably on root domains,
 * preview environments, and GitHub Pages subpaths (e.g. https://<username>.github.io/<repo-name>/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(?:https?:|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}
