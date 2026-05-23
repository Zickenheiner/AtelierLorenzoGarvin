import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetGallery({ projet }: Props) {
  if (projet.gallery.length === 0) return null;

  return (
    <section className="w-full bg-[var(--lga-bg)] px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-10">
        <header className="flex items-center gap-4">
          <h2
            className="shrink-0 text-[24px] leading-8 tracking-[-0.05em] text-[#1a1c1c] sm:text-[28px] lg:text-[30px] lg:leading-9"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Images / Détails
          </h2>
          <span className="h-px flex-1 bg-[var(--lga-footer)]" />
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projet.gallery.map((item, idx) => (
            <img
              key={`${item.img}-${idx}`}
              src={item.img}
              alt={item.alt}
              className="block h-auto w-full object-cover sm:aspect-[384/300]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
