import { Head } from 'vite-react-ssg';

const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? ''
).replace(/\/+$/, '');

export default function OrganizationJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Architect',
    name: "Atelier d'architecture LGA — Lorenzo Garvin",
    description:
      "Atelier d'architecture dirigé par Lorenzo Garvin : conception & design, maîtrise d'œuvre et architecture d'intérieur.",
    email: 'jj@lorenzogarvin.eu',
    telephone: '+33664647542',
    founder: { '@type': 'Person', name: 'Lorenzo Garvin' },
    ...(SITE_URL
      ? { url: SITE_URL, image: `${SITE_URL}/images/hero-blackpatio.webp` }
      : {}),
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
