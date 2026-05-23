import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetHero({ projet }: Props) {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden lg:h-[700px]">
      <img
        src={projet.hero.img}
        alt={projet.hero.alt || projet.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--lga-hero-tint)]/30 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 flex h-full max-w-[1216px] flex-col justify-end gap-6 px-6 pb-6 sm:px-8 lg:pb-10">
        <h1
          className="text-[44px] leading-[1.05] tracking-[-0.02em] text-[var(--lga-hero-text)] uppercase sm:text-[56px]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {projet.title}
        </h1>
      </div>
    </section>
  );
}
