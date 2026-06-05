import { useState } from 'react';
import { Container } from '@/core/components/ui/container';
import { Heading } from '@/core/components/ui/heading';
import { Section } from '@/core/components/ui/section';
import { toAssetUrl } from '@/core/utils/asset-url';
import type { ProjetEntity } from '../../domain/entities/projet.entity';
import Lightbox from './Lightbox';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetGallery({ projet }: Props) {
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  if (projet.gallery.length === 0) return null;

  const images = projet.gallery.map((item) => ({
    src: toAssetUrl(item.imgSource),
    alt: item.alt,
  }));

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
              <button
                key={`${item.img}-${idx}`}
                type="button"
                onClick={() => {
                  setInitialIndex(idx);
                  setOpen(true);
                }}
                className="block cursor-zoom-in"
                aria-label={`Agrandir ${item.alt}`}
              >
                <img
                  src={toAssetUrl(item.img)}
                  alt={item.alt}
                  loading="lazy"
                  className="block h-auto w-full object-cover sm:aspect-[4/3]"
                />
              </button>
            ))}
          </div>
        </div>
      </Container>

      <Lightbox
        images={images}
        open={open}
        onOpenChange={setOpen}
        initialIndex={initialIndex}
      />
    </Section>
  );
}
