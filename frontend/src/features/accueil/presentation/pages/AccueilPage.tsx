import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';
import PhilosophySection from '../components/PhilosophySection';
import SelectionSection from '../components/SelectionSection';

export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-[var(--lga-bg)] flex flex-col gap-8">
      <Hero />
      <PhilosophySection />
      <SelectionSection />
      <ContactSection />
    </div>
  );
}
