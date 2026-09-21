const INTRO = `L’atelier accompagne particuliers et professionnels dans leurs projets de rénovation, réhabilitation, extension et construction neuve. Notre approche associe qualité architecturale, rigueur, performance environnementale et attention portée aux usages pour concevoir des espaces durables, confortables et adaptés à chaque mode de vie et besoins.`;

const APPROCHE = `Nous plaçons l’usager au cœur de chaque projet à travers une démarche fondée sur l’écoute, le dialogue et la recherche de solutions adaptées. Spécialisés dans la rénovation énergétique de logements anciens, réhabilitation de maisons rurales et l’utilisation de matériaux biosourcés. Les enjeux écologiques comme opportunité, pas comme contrainte. Nous concevons des architectures sobres, pérennes et respectueuses de leur environnement sur le long terme.`;

const DOMAINES = [
  'Études de faisabilité et conseil',
  'Conception architecturale',
  'Rénovation et réhabilitation',
  'Extensions et surélévations',
  'Architecture intérieure',
  'Architecture commerciale',
  'Démarches administratives',
  'Maitrise d’œuvre et suivi de chantier',
];

export default function PhilosophySection() {
  return (
    <section
      id="prestations"
      className="w-full bg-[var(--lga-bg)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1216px]">
        <div className="ml-auto flex max-w-[904px] flex-col text-right lg:mr-[104px]">
          <p className="font-display text-[16px] leading-[22px] font-normal text-[var(--lga-ink)] sm:text-[18px] sm:leading-[24px]">
            {INTRO}
          </p>

          <h3 className="font-display mt-[50px] text-[16px] leading-[16.5px] font-black tracking-[0.0556em] text-[var(--lga-muted)] sm:text-[18px]">
            Concevoir avec sens
          </h3>
          <p className="font-display mt-[10px] text-[16px] leading-[22px] font-normal text-[var(--lga-ink)] sm:text-[18px] sm:leading-[24px]">
            {APPROCHE}
          </p>

          <h3 className="font-display mt-[50px] text-[16px] leading-[16.5px] font-black tracking-[0.0556em] text-[var(--lga-muted)] sm:text-[18px]">
            Domaines d’intervention
          </h3>
          <ul className="mt-[10px] flex flex-col gap-[10px]">
            {DOMAINES.map((domaine) => (
              <li
                key={domaine}
                className="font-display text-[16px] leading-[16.5px] font-medium tracking-[0.0611em] text-[var(--lga-muted)] underline underline-offset-4 sm:text-[18px]"
              >
                {domaine}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
