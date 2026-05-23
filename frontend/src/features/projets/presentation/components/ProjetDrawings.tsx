import { Container } from '@/core/components/ui/container';
import { Heading } from '@/core/components/ui/heading';
import { Section } from '@/core/components/ui/section';
import { toAssetUrl } from '@/core/utils/asset-url';
import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetDrawings({ projet }: Props) {
  if (projet.drawings.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <header className="flex items-center gap-4">
            <Heading as="h2" level="h2" className="shrink-0 text-[#1a1c1c]">
              Dessins / Coupes
            </Heading>
            <span className="h-px flex-1 bg-[var(--lga-footer)]" />
          </header>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
            {projet.drawings.map((d, idx) => (
              <figure
                key={`${d.img}-${idx}`}
                className="flex flex-col gap-3 bg-[var(--lga-surface)] p-6 sm:p-10"
              >
                <img
                  src={toAssetUrl(d.img)}
                  alt={d.alt}
                  className="h-auto w-full object-contain lg:aspect-[602/590]"
                />
                <figcaption
                  className="text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  {d.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
