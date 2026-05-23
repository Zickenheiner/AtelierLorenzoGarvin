import { Container } from '@/core/components/ui/container';
import { Heading } from '@/core/components/ui/heading';
import { Section } from '@/core/components/ui/section';
import { toAssetUrl } from '@/core/utils/asset-url';
import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetGallery({ projet }: Props) {
  if (projet.gallery.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <header className="flex items-center gap-4">
            <Heading as="h2" level="h2" className="shrink-0 text-[#1a1c1c]">
              Images / Détails
            </Heading>
            <span className="h-px flex-1 bg-[var(--lga-footer)]" />
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projet.gallery.map((item, idx) => (
              <img
                key={`${item.img}-${idx}`}
                src={toAssetUrl(item.img)}
                alt={item.alt}
                className="block h-auto w-full object-cover sm:aspect-[384/300]"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
