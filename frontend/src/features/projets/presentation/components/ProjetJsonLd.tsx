import { toAssetUrl } from '@/core/utils/asset-url';
import { SITE_URL } from '@/core/utils/site-url';
import { Head } from 'vite-react-ssg';
import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetJsonLd({ projet }: Props) {
  if (!SITE_URL) return null;

  const projetUrl = `${SITE_URL}/projets/${projet.slug}`;
  const images = [
    projet.hero?.img,
    ...(projet.gallery ?? []).map((item) => item.img),
  ]
    .map((img) => toAssetUrl(img))
    .filter((url) => Boolean(url));

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projets',
            item: `${SITE_URL}/projets`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: projet.title,
            item: projetUrl,
          },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': projetUrl,
        url: projetUrl,
        name: projet.title,
        description: projet.resume,
        ...(images.length ? { image: images } : {}),
        creator: {
          '@type': 'Architect',
          name: "Atelier d'architecture LGA — Lorenzo Garvin",
          url: SITE_URL,
        },
        ...(projet.spec?.length
          ? {
              additionalProperty: projet.spec.map((spec) => ({
                '@type': 'PropertyValue',
                name: spec.label,
                value: spec.value,
              })),
            }
          : {}),
      },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
