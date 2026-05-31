import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

export default function ContactPage() {
  return (
    <section className="flex w-full flex-1 items-center justify-center bg-[var(--lga-surface)] px-8 py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-[1216px] grid-cols-1 gap-12 lg:grid-cols-[450px_1fr] lg:gap-24">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
