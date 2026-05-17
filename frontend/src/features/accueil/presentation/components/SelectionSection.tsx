export default function SelectionSection() {
  return (
    <section id="projets" className="w-full bg-[var(--lga-surface)] px-0 py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-8">
        <header className="flex items-end justify-between">
          <h2
            className="text-[30px] leading-9 tracking-[-0.05em] text-[#1a1c1c]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Sélection
          </h2>
        </header>

        <article className="grid grid-cols-1 lg:grid-cols-[709px_507px]">
          <div className="bg-white">
            <img
              src="/images/villa-project.png"
              alt="Projet Extension — villa"
              className="block h-[531px] w-full object-cover"
            />
          </div>
          <div className="flex h-[531px] flex-col justify-between bg-[var(--lga-bg)] p-20">
            <div className="flex flex-col gap-4">
              <h3
                className="text-[36px] leading-10 tracking-[-0.05em] text-[var(--lga-ink)]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                EXTENSION
              </h3>
              <p
                className="text-[18px] leading-[29.25px] text-[var(--lga-ink)]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                A study in subterranean light. This residence carves itself into
                the volcanic rock, utilizing negative space to breathe life into
                darkness.
              </p>
            </div>
            <a
              href="#case-study"
              className="inline-flex items-center gap-2 self-start border-b border-[var(--lga-ink)] pb-1 text-[14px] leading-5 tracking-[0.1em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-70"
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
