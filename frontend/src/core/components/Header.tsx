import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/core/utils/cn';
import routes from '@/core/constants/routes';

const NAV_LINKS = [
  { label: 'Accueil', href: routes.home },
  { label: 'Projets', href: '#projets' },
  { label: 'Prestations', href: '#prestations' },
  { label: 'Contact', href: routes.contact },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (href: string) => href.startsWith('/') && href === pathname;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 w-full bg-[var(--lga-bg)]">
        <div className="mx-auto flex items-center justify-between border-b border-gray-200 px-8 py-2">
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://www.lorenzogarvin.eu/assets/lgalogo100x100.png"
              alt="LGA"
              className="h-[50px] w-[50px] object-contain"
            />
            <span
              className="text-[18px] leading-[25px] font-bold tracking-[-0.06em] text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              atelier d&rsquo;architecture LGA
            </span>
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      'text-[16px] leading-6 tracking-[-0.025em] transition-colors hover:text-[var(--lga-ink)]',
                      isActive(link.href)
                        ? 'font-bold text-[#000000]'
                        : 'font-normal text-[var(--lga-subtle)]',
                    )}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-sidebar"
            onClick={() => setIsOpen((v) => !v)}
            className="relative z-[60] inline-flex h-10 w-10 items-center justify-center text-[var(--lga-ink)] md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6 cursor-pointer" strokeWidth={1.5} />
            ) : (
              <Plus className="h-6 w-6 cursor-pointer" strokeWidth={3} />
            )}
          </button>
        </div>
      </header>

      <div
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 flex w-[300px] max-w-[85vw] flex-col bg-[var(--lga-bg)] shadow-2xl transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <span
            className="text-[14px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
          >
            Menu
          </span>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center text-[var(--lga-ink)]"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'rounded-lg px-4 py-3 text-[18px] leading-6 tracking-[-0.025em] transition-colors',
                isActive(link.href)
                  ? 'bg-black/[0.04] font-bold text-[#000000]'
                  : 'font-normal text-[var(--lga-subtle)] hover:bg-black/[0.03] hover:text-[var(--lga-ink)]',
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
