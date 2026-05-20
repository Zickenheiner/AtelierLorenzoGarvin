import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetNavigation({ projet }: Props) {
  if (!projet.previous && !projet.next) return null;

  return (
    <section className="w-full border-t border-[var(--lga-footer)] bg-[var(--lga-bg)] px-6 py-10 sm:px-8 lg:py-12">
      <div className="mx-auto flex max-w-[1216px] items-center justify-between gap-6">
        {projet.previous ? (
          <Link
            to={`/projet/${projet.previous.slug}`}
            className="group flex items-center gap-4"
          >
            <ArrowLeft
              className="h-4 w-4 text-[var(--lga-ink)] transition-transform group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            <div className="flex flex-col gap-1">
              <span
                className="text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {projet.previous.label}
              </span>
              <span
                className="text-[18px] leading-7 text-[var(--lga-ink)] sm:text-[20px]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
              >
                {projet.previous.title}
              </span>
            </div>
          </Link>
        ) : (
          <span />
        )}

        {projet.next ? (
          <Link
            to={`/projet/${projet.next.slug}`}
            className="group flex items-center gap-4"
          >
            <div className="flex flex-col gap-1 text-right">
              <span
                className="text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                {projet.next.label}
              </span>
              <span
                className="text-[18px] leading-7 text-[var(--lga-ink)] sm:text-[20px]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
              >
                {projet.next.title}
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 text-[var(--lga-ink)] transition-transform group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </section>
  );
}
