import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetDrawings({ projet }: Props) {
  if (projet.drawings.length === 0) return null;

  return (
    <section className="w-full bg-[var(--lga-bg)] px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-10">
        <h2
          className="text-[24px] leading-8 tracking-[-0.05em] text-[#1a1c1c] sm:text-[28px] lg:text-[30px] lg:leading-9"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          Dessins / Coupes
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
          {projet.drawings.map((d, idx) => (
            <figure
              key={`${d.img}-${idx}`}
              className="flex flex-col gap-3 bg-[var(--lga-surface)] p-6 sm:p-10"
            >
              <img
                src={d.img}
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
    </section>
  );
}
