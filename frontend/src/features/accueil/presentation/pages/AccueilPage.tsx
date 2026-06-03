import OrganizationJsonLd from '@/core/components/OrganizationJsonLd';
import Seo from '@/core/components/Seo';
import seo from '@/core/constants/seo';
import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import PhilosophySection from '../components/PhilosophySection';
import SelectionSection from '../components/SelectionSection';

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-[var(--lga-bg)] flex flex-col gap-8">
      <Seo
        title={seo.home.title}
        description={seo.home.description}
        path={seo.home.path}
      />
      <OrganizationJsonLd />
      <Hero />
      <PhilosophySection />
      <SelectionSection />
      <ContactSection />
    </div>
  );
}
