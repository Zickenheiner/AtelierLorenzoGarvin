import { Fragment } from 'react';

interface Block {
  title: string;
  body: string;
}

const BLOCKS_LEFT: Block[] = [
  {
    title: 'Accompagnement technique',
    body: `Nous vous accompagnons à chaque étape de votre projet de rénovation, avec un regard expert et pragmatique. De l’analyse du bien aux choix techniques et esthétiques, nous vous aidons à prendre les bonnes décisions.\n\nNotre objectif : optimiser le potentiel de votre espace, maîtriser les contraintes et garantir la cohérence du projet.\n\nUn accompagnement sur mesure pour rénover en toute sérénité, avec justesse et efficacité.`,
  },
  {
    title: 'Visite conseil avant achat',
    body: `Nous vous proposons un accompagnement sur mesure en amont de votre acquisition afin de révéler tout le potentiel d’un lieu avant même de vous engager.\n\nLors des visites, nous vous aidons à vous projeter au-delà de l’existant : analyse des volumes, possibilités d’aménagement, qualité de la lumière, contraintes techniques… Chaque élément est étudié pour vous permettre de prendre une décision en toute confiance.\n\nCet accompagnement vous offre un regard professionnel et objectif, essentiel pour sécuriser votre achat et éviter les mauvaises surprises.`,
  },
  {
    title: 'Études de faisabilité',
    body: `L’étude de faisabilité est la première étape clé pour valider votre projet. Elle permet d’analyser les contraintes techniques, réglementaires et budgétaires afin de définir une base solide et réaliste.\n\nNous évaluons le potentiel de votre terrain ou bâtiment, intégrons les principes de construction et identifions les solutions adaptées.\n\nCette étape fondatrice vous engage sereinement dans la suite de votre projet. Elle constitue un véritable outil d’aide à la décision, au service d’une architecture durable, maîtrisée et en accord avec vos ambitions.`,
  },
];

const BLOCKS_RIGHT: Block[] = [
  {
    title: 'Extensions et Surélévations',
    body: `Nous concevons des extensions et surélévations qui s’intègrent harmonieusement à l’existant, tout en révélant de nouveaux usages. Chaque projet est pensé pour optimiser les volumes, la lumière et la fluidité des espaces.\n\nNous vous accompagnons de la faisabilité à la conception, en tenant compte des contraintes techniques, réglementaires et esthétiques.\n\nL’objectif : agrandir votre espace de vie avec cohérence, valeur et durabilité.`,
  },
  {
    title: 'Architecture commerciale',
    body: `Votre espace commercial est bien plus qu’un lieu de vente : c’est une véritable expérience de marque. Nous concevons des environnements qui valorisent votre identité, attirent votre clientèle et renforcent l’impact de votre offre.\n\nDe l’organisation des volumes à la mise en valeur des produits, chaque détail est étudié pour optimiser les parcours et renforcer l’impact de votre offre.\n\nNous vous accompagnons à chaque étape pour créer un espace distinctif, efficace et durable, au service de votre activité.`,
  },
  {
    title: 'Démarches administratives',
    body: `Nous vous accompagnons dans l’ensemble de vos démarches administratives : dépôt de déclaration préalable ou permis de construire.\n\nNous constituons des dossiers complets, clairs et conformes aux exigences réglementaires, en assurant le suivi auprès des administrations.\n\nUn accompagnement rigoureux pour sécuriser votre projet et simplifier chaque étape.`,
  },
];

function ContexteBlock({ title, body }: Block) {
  return (
    <article className="flex flex-col gap-4">
      <h3
        className="text-[30px] leading-[60px] tracking-[-0.02em] text-black"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
      >
        {title}
      </h3>
      <p
        className="whitespace-pre-line text-justify text-[17px] leading-[1.85] text-[#5f5e5e]"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
      >
        {body}
      </p>
    </article>
  );
}

export default function ContexteSection() {
  return (
    <section className="w-full bg-[var(--lga-bg)] px-8">
      <div className="mx-auto flex max-w-[1216px] flex-col gap-16">
        <span
          className="text-[11px] leading-[16.5px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
        >
          04 / Autres prestations
        </span>

        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
          {BLOCKS_LEFT.map((left, i) => (
            <Fragment key={left.title}>
              <ContexteBlock {...left} />
              <ContexteBlock {...BLOCKS_RIGHT[i]} />
            </Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <img
            src="/images/prestation-urban-landscape.png"
            alt="Paysage urbain"
            className="h-[400px] w-full object-cover"
          />
          <img
            src="/images/prestation-environment.png"
            alt="Environnement naturel"
            className="h-[400px] w-full object-cover"
          />
          <img
            src="/images/prestation-mountain-context.png"
            alt="Contexte montagne"
            className="h-[400px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
