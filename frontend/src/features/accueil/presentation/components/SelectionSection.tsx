import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/core/components/ui/carousel';
import { Heading } from '@/core/components/ui/heading';
import routes from '@/core/constants/routes';
import { toAssetUrl } from '@/core/utils/asset-url';
import { useProjets } from '@/features/projets/domain/hooks/projet.hook';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function SelectionSection() {
  const { data: projets } = useProjets();
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const featured = (projets ?? []).filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <section
      id="projets"
      className="w-full bg-[var(--lga-surface)] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 sm:gap-12 lg:gap-16 lg:px-8">
        <header className="flex items-end justify-between">
          <Heading as="h2" level="h2" className="text-[#1a1c1c]">
            Sélection
          </Heading>
        </header>

        <Carousel
          opts={{ loop: featured.length > 1 }}
          plugins={featured.length > 1 ? [autoplay.current] : []}
          className="w-full"
        >
          <CarouselContent>
            {featured.map((projet) => (
              <CarouselItem key={projet.id}>
                <article className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
                  <div className="bg-white">
                    <img
                      src={toAssetUrl(
                        projet.hero.imgCarousel || projet.hero.img,
                      )}
                      alt={projet.hero.alt || projet.title}
                      loading="lazy"
                      className="block h-auto w-full object-cover lg:h-[531px]"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-8 bg-[var(--lga-bg)] p-6 sm:p-10 lg:h-[531px] lg:gap-0 lg:p-20">
                    <div className="flex flex-col gap-4">
                      <h3
                        className="text-[28px] leading-9 tracking-[-0.05em] text-[var(--lga-ink)] uppercase sm:text-[32px] lg:text-[36px] lg:leading-10"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                        }}
                      >
                        {projet.title}
                      </h3>
                      <p
                        className="text-[16px] leading-[1.85] text-[var(--lga-ink)] sm:text-[17px] lg:text-[18px] lg:leading-[1.85]"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                        }}
                      >
                        {projet.resume}
                      </p>
                    </div>
                    <Link
                      to={routes.projets(projet.slug)}
                      className="inline-flex items-center gap-2 self-start border-b border-[var(--lga-ink)] pb-1 text-[12px] leading-5 tracking-[0.1em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-70 sm:text-[14px]"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                      }}
                    >
                      Découvrir le projet
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          {featured.length > 1 ? (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : null}
        </Carousel>
      </div>
    </section>
  );
}
