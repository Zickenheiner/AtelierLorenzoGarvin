import { Head } from 'vite-react-ssg';

const SITE_NAME = "Atelier d'architecture LGA — Lorenzo Garvin";

const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? ''
).replace(/\/+$/, '');

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

function toAbsolute(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (!SITE_URL) return undefined;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function Seo({
  title,
  description,
  path = '',
  image = '/images/hero-blackpatio.webp',
  type = 'website',
  noindex = false,
}: SeoProps) {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} — Atelier d'architecture LGA`;
  const canonical = SITE_URL ? `${SITE_URL}${path}` : undefined;
  const ogImage = toAbsolute(image);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  );
}
