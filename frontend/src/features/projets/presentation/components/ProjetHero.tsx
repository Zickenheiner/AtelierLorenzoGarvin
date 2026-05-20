import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetHero({ projet }: Props) {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden lg:h-[700px]">
      <img
        src={projet.heroImage.src}
        alt={projet.heroImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--lga-hero-tint)]/30 mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1216px] flex-col justify-end gap-6 px-6 pb-12 sm:px-8 sm:pb-16 lg:pb-20">
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
