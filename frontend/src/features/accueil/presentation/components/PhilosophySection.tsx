type Block = {
  eyebrow: string;
  body: string;
};

const BLOCKS: Block[] = [
  {
    eyebrow: 'Construire durablement',
    body: `L’atelier s’attache à concevoir des propositions adaptées pour chaque projet en se souciant de l’espace habitable, l’environnement, les matières et les détails de mise en œuvre qui le compose.\n\nLa philosophie de l’atelier place l’usager au cœur de la conception, en privilégiant l’écoute, le dialogue et une collaboration étroite mettant à sa disposition notre expérience, notre savoir-faire et notre engagement pour la réussite du projet.\n\nSpécialisés en rénovation de haute précision technique avec des matériaux biosourcés utilisés avec rigueur, nous accompagnons les particuliers dans les rénovations énergétiques de logements anciens et les réhabilitation de maisons rurales en faisant des enjeux écologiques une opportunité de concevoir des architectures qui fonctionnent techniquement sur le long terme, confortables et harmonieuses.\n\nDe l’accompagnement de l’ébauche du projet jusqu’à sa réalisation finale, l’atelier met en avant la recherche pertinente du résultat optimal avec rigueur et sensibilité.`,
  },
  {
    eyebrow: 'De la conception à la réalisation',
    body: `Nous intervenons sur plusieurs échelles et à toutes les étapes : Études et conception architecturale; Réhabilitations; Extensions; Surélévations; Aménagement des espaces intérieurs; Choix des matériaux biosourcés adaptés; Optimisation énergétique et bioclimatique; Suivi de chantier et mise en œuvre écologique.\n\nDe l’accompagnement de l’ébauche du projet jusqu’à sa réalisation finale, l’atelier met en avant la recherche pertinente du résultat optimal avec rigueur et sensibilité. Notre approche globale garantit la cohérence entre esthétique, confort et performance environnementale.`,
  },
  {
    eyebrow: 'Construire pour demain',
    body: `Opter pour une construction écologique, c’est investir dans un habitat durable, économe en énergie et respectueux de votre santé. C’est aussi faire le choix d’une architecture qui s’inscrit dans son territoire et valorise les ressources locales.`,
  },
  {
    eyebrow: 'Donnez vie à votre projet',
    body: `Que ce soit pour une maison individuelle, un bâtiment professionnel ou une rénovation, nous vous accompagnons pour créer des espaces durables, harmonieux et porteurs de sens.`,
  },
];

export default function PhilosophySection() {
  return (
    <section id="prestations" className="w-full bg-[var(--lga-bg)] px-8 py-24">
      <div className="lg:pl-40 mx-auto flex max-w-[1216px] flex-col gap-8">
        {BLOCKS.map((block) => (
          <article key={block.eyebrow} className="flex flex-col gap-4">
            <h3
              className="text-right text-[18px] leading-[16.5px] tracking-[0.06em] text-[var(--lga-muted)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
            >
              {block.eyebrow}
            </h3>
            <div
              className="text-justify text-[20px] leading-[1.85] whitespace-pre-line text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {block.body}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
