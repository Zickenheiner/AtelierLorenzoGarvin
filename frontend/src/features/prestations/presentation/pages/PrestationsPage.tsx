import Seo from '@/core/components/Seo';
import ContexteSection from '../components/ContexteSection';
import CtaSection from '../components/CtaSection';
import ServiceSection from '../components/ServiceSection';

const SERVICE_01 = `La genèse de chaque projet repose sur une lecture attentive du lieu, de la lumière et des usages. L’architecture que l’atelier développe devient plus qu’une simple construction : elle se transforme en une expérience sensible et pensée dans les moindres détails.

Le design soigné ne se limite pas à l’esthétique. Il s’exprime dans la précision des proportions, la qualité des matériaux et la cohérence entre les espaces. Les espaces sont conçus pour être vécus : ils s’adaptent aux rythmes du quotidien tout en offrant une sensation de confort, de fluidité et de sérénité.

Avec plus de 14 ans d’expérience dans le domaine, nous proposons des solutions adaptées pour chaque projet. Nous vous accompagnons tout au long de vos travaux : de la conception et design des espaces, à l’établissement des plans, au choix des matériaux et du mobilier, ainsi que pendant le suivi complet du chantier.`;

const SERVICE_02 = `De la première pierre à la remise des clés, nous assurons la coordination technique et administrative.

Nous prenons en charge le pilotage du chantier et la coordination des entreprises. Notre gestion de projet garantit le respect des délais, des budgets et de l'intégrité architecturale du concept initial.

Notre expertise nous permet d’analyser tous les paramètres de votre projet avant d’engager vos travaux : diagnostic de l’existant, examen des contraintes techniques (murs porteurs, présence de réseaux…) et étude de mise au point technique (plans d’électricité, plomberie, chauffage et ventilation).`;

const SERVICE_03 = `Chaque projet naît d’un dialogue. Nous travaillons en étroite collaboration avec des partenaires spécialisés en architecture d’intérieur, afin de concevoir des espaces cohérents, sensibles et parfaitement adaptés aux usages.

Cette synergie permet d’enrichir le processus de création dès les premières étapes. Architecte et architecte d’intérieur unissent leurs expertises pour penser simultanément les volumes, les circulations, les matières et les ambiances.

Au fil du projet, cette collaboration assure une continuité entre l’enveloppe architecturale et les espaces intérieurs, où le mobilier, la lumière et les textures participent pleinement à l’identité du lieu.

Travailler main dans la main avec nos partenaires, c’est offrir à nos clients une approche globale, fluide et exigeante. C’est aussi garantir un résultat sur mesure, où esthétique, confort et fonctionnalité s’accordent avec justesse pour donner vie à des espaces uniques et durables.`;

export default function PrestationsPage() {
  return (
    <div>
      <Seo
        title="Prestations"
        description="Conception & design, maîtrise d'œuvre et architecture d'intérieur. Plus de 14 ans d'expérience pour vous accompagner de la conception au suivi complet du chantier."
        path="/prestations"
        image="/images/prestation-service-01-conception.webp"
      />
      <div className="flex flex-col px-8 py-20 md:py-24 gap-16">
        <ServiceSection
          number="01"
          eyebrow="Concept"
          title="Conception & Design"
          body={SERVICE_01}
          image="/images/prestation-service-01-conception.webp"
          imageAlt="Dessin architectural — Conception et design"
          imageWidth={512}
          imageHeight={512}
        />
        <ServiceSection
          number="02"
          eyebrow="Exécution"
          title="Maîtrise d'Œuvre"
          body={SERVICE_02}
          image="/images/prestation-service-02-maitrise.webp"
          imageAlt="Chantier — Maîtrise d'œuvre"
          imageWidth={1500}
          imageHeight={1000}
          reverse
        />
        <ServiceSection
          number="03"
          eyebrow="Intimité"
          title="Architecture d'Intérieur"
          body={SERVICE_03}
          image="/images/prestation-service-03-interieur.webp"
          imageAlt="Dessin architectural — Architecture d'intérieur"
          imageWidth={1333}
          imageHeight={2000}
        />
        <ContexteSection />
      </div>
      <CtaSection />
    </div>
  );
}
