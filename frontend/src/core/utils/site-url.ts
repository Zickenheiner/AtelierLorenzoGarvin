function normalizeSiteUrl(raw: string | undefined | null): string {
  let url = (raw ?? '').trim().replace(/\/+$/, '');
  if (!url) return '';
  if (url.startsWith('://')) url = `https${url}`;
  else if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url;
}

export const SITE_URL = normalizeSiteUrl(
  import.meta.env.VITE_SITE_URL as string | undefined,
);
