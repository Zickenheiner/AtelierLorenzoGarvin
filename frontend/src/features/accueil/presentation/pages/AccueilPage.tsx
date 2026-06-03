import OrganizationJsonLd from '@/core/components/OrganizationJsonLd';
import Seo from '@/core/components/Seo';
import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import PhilosophySection from '../components/PhilosophySection';
import SelectionSection from '../components/SelectionSection';

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-[var(--lga-bg)] flex flex-col gap-8">
      <Seo
        title="Atelier d'architecture LGA — Lorenzo Garvin"
        description="Atelier d'architecture dirigé par Lorenzo Garvin : conception & design, maîtrise d'œuvre et architecture d'intérieur. Une architecture sensible, pensée pour le lieu, la lumière et les usages."
        path="/"
      />
      <OrganizationJsonLd />
      <Hero />
      <PhilosophySection />
      <SelectionSection />
      <ContactSection />
    </div>
  );
}
