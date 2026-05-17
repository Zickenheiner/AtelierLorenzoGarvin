export default function Hero() {
  return (
    <section
      aria-label="Atelier d'architecture LGA — accueil"
      className="relative h-screen w-full overflow-hidden"
    >
      <img
        src="/images/hero-blackpatio.png"
        alt="Patio architectural — atelier LGA"
        className="absolute inset-0 h-screen w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--lga-hero-tint)]/30 mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col items-end justify-end px-8 py-24">
        <div className="flex flex-col items-center pb-4 text-center text-[var(--lga-hero-text)]">
          <span
            className="block uppercase tracking-[-0.064em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: '70px',
              lineHeight: '67px',
            }}
          >
            Lorenzo
            <br />
            Garvin
          </span>
        </div>
      </div>
    </section>
  );
}
