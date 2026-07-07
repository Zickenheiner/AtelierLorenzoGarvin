import { Link } from 'react-router-dom';
import routes from '@/core/constants/routes';

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#323232]">
      <div className="relative z-10 mx-auto flex max-w-[1216px] flex-col items-center gap-8 px-8 py-24 text-center">
        <h2
          className="text-[40px] leading-[1.2] tracking-[-0.02em] text-[var(--lga-hero-text)] sm:text-[50px] sm:leading-[90px]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          Construisons votre projet.
        </h2>

        <p
          className="max-w-[672px] text-[18px] leading-[1.85] text-[var(--lga-hero-text)] sm:text-[20px]"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
        >
          Notre équipe est prête à transformer vos idées en réalité
          architecturale.
          <br />
          Contactez-nous pour une première consultation.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link
            to={routes.contact}
            className="inline-flex h-[62px] items-center justify-center bg-white px-10 text-[14px] leading-5 tracking-[0.15em] text-black uppercase transition-opacity hover:opacity-90"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 900 }}
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
