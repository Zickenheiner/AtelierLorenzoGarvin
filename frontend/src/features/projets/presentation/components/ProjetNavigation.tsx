import { Container } from '@/core/components/ui/container';
import { Section } from '@/core/components/ui/section';
import routes from '@/core/constants/routes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjetEntity } from '../../domain/entities/projet.entity';
import { useProjets } from '../../domain/hooks/projet.hook';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetNavigation({ projet }: Props) {
  const { data: projets } = useProjets();

  const ordered = [...(projets ?? [])].sort((a, b) => a.order - b.order);
  const currentIndex = ordered.findIndex((item) => item.id === projet.id);

  if (currentIndex === -1 || ordered.length < 2) return null;

  const previous = ordered[(currentIndex - 1 + ordered.length) % ordered.length];
  const next = ordered[(currentIndex + 1) % ordered.length];

  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <nav
          aria-label="Navigation entre les projets"
          className="flex items-center justify-between gap-6"
        >
          <Link
            to={routes.realisations(previous.slug)}
            aria-label={`Projet précédent : ${previous.title}`}
            className="group flex min-w-0 items-center gap-4 transition-opacity hover:opacity-70 sm:gap-6"
          >
            <ChevronLeft
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-5 shrink-0 text-[var(--lga-ink)] transition-transform group-hover:-translate-x-1"
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-display text-[11px] leading-[16.5px] font-normal tracking-[0.1em] text-[var(--lga-muted)]">
                Précédent
              </span>
              <span className="truncate text-[16px] leading-7 font-bold text-[var(--lga-ink)] uppercase sm:text-[20px]">
                {previous.title}
              </span>
            </span>
          </Link>

          <Link
            to={routes.realisations(next.slug)}
            aria-label={`Projet suivant : ${next.title}`}
            className="group flex min-w-0 items-center gap-4 transition-opacity hover:opacity-70 sm:gap-6"
          >
            <span className="flex min-w-0 flex-col text-right">
              <span className="font-display text-[11px] leading-[16.5px] font-normal tracking-[0.1em] text-[var(--lga-muted)]">
                Suivant
              </span>
              <span className="truncate text-[16px] leading-7 font-bold text-[var(--lga-ink)] uppercase sm:text-[20px]">
                {next.title}
              </span>
            </span>
            <ChevronRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-5 shrink-0 text-[var(--lga-ink)] transition-transform group-hover:translate-x-1"
            />
          </Link>
        </nav>
      </Container>
    </Section>
  );
}
