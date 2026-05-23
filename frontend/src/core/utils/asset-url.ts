export function toAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${import.meta.env.VITE_API_URL}${url}`;
  return url;
}
