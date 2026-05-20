export default function SelectionSection() {
  return (
    <section
      id="projets"
      className="w-full bg-[var(--lga-surface)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 sm:gap-12 lg:gap-16 lg:px-8">
        <header className="flex items-end justify-between">
          <h2
            className="text-[24px] leading-8 tracking-[-0.05em] text-[#1a1c1c] sm:text-[28px] lg:text-[30px] lg:leading-9"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Sélection
          </h2>
        </header>

        <article className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
          <div className="bg-white">
            <img
              src="/images/villa-project.png"
              alt="Projet Extension — villa"
              className="block h-auto w-full object-cover lg:h-[531px]"
            />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-[var(--lga-bg)] p-6 sm:p-10 lg:h-[531px] lg:gap-0 lg:p-20">
            <div className="flex flex-col gap-4">
              <h3
                className="text-[28px] leading-9 tracking-[-0.05em] text-[var(--lga-ink)] sm:text-[32px] lg:text-[36px] lg:leading-10"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                EXTENSION
              </h3>
              <p
                className="text-[16px] leading-[1.85] text-[var(--lga-ink)] sm:text-[17px] lg:text-[18px] lg:leading-[1.85]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                A study in subterranean light. This residence carves itself into
                the volcanic rock, utilizing negative space to breathe life into
                darkness.
              </p>
            </div>
            <a
              href="#case-study"
              className="inline-flex items-center gap-2 self-start border-b border-[var(--lga-ink)] pb-1 text-[12px] leading-5 tracking-[0.1em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-70 sm:text-[14px]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              Explore case study
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
