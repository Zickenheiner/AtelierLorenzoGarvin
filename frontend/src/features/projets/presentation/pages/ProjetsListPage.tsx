import { Container } from '@/core/components/ui/container';
import { ErrorAlert } from '@/core/components/ui/error-alert';
import { Heading } from '@/core/components/ui/heading';
import { LoadingState } from '@/core/components/ui/loading-state';
import routes from '@/core/constants/routes';
import { toAssetUrl } from '@/core/utils/asset-url';
import { Link } from 'react-router-dom';
import { useProjets } from '../../domain/hooks/projet.hook';

export default function ProjetsListPage() {
  const { data: projets, isLoading, error } = useProjets();

  return (
    <main className="w-full bg-[var(--lga-bg)] px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
      <Container size="xl">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          <header className="flex flex-col gap-4 lg:max-w-[720px]">
            <Heading as="h1" level="h1" size="hero">
              Projets
            </Heading>
            <p
              className="text-[16px] leading-[1.7] text-[var(--lga-muted)] sm:text-[17px] lg:text-[18px]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
            >
              Une sélection d&rsquo;œuvres et d&rsquo;aménagements réalisés par
              l&rsquo;atelier. Chaque projet raconte une matière, une géométrie,
              une lumière.
            </p>
          </header>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorAlert>Erreur : {error.message}</ErrorAlert>
          ) : !projets || projets.length === 0 ? (
            <p
              className="text-[15px] text-[var(--lga-muted)] italic"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Aucun projet à afficher pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {projets.map((projet) => (
                <Link
                  key={projet.id}
                  to={routes.projets(projet.slug)}
                  className="group relative block aspect-[4/5] overflow-hidden bg-[var(--lga-surface)]"
                >
                  <img
                    src={toAssetUrl(projet.hero.img)}
                    alt={projet.hero.alt || projet.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-8">
                    <Heading
                      as="h2"
                      level="h2"
                      className="text-white uppercase"
                    >
                      {projet.title}
                    </Heading>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
