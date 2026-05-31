import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'nous contacter — atelier lorenzo garvin',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // L'utilisateur a annulé le partage natif : on ignore silencieusement.
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.error('Le partage a échoué :', error);
    }
  };

  return (
    <div className="flex max-w-[450px] flex-col gap-5">
      <h2
        className="text-[20px] leading-[44px] tracking-[-0.05em] text-black"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
      >
        nous contacter via&nbsp;:
      </h2>

      <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 pt-4">
        <dt
          className="text-[16px] leading-6 text-[#1a1c1c]"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
        >
          email
        </dt>
        <dd>
          <a
            href="mailto:jj@lorenzogarvin.eu"
            className="text-[16px] leading-6 text-[#1a1c1c] transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            jj@lorenzogarvin.eu
          </a>
        </dd>

        <dt
          className="text-[16px] leading-6 text-[#1a1c1c]"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
        >
          tel
        </dt>
        <dd>
          <a
            href="tel:+33664647542"
            className="text-[16px] leading-6 text-[#1a1c1c] transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            06 64 64 75 42
          </a>
        </dd>
      </dl>

      <div className="pt-4">
        <button
          type="button"
          onClick={handleShare}
          aria-label={copied ? 'Lien copié' : 'Partager'}
          className="inline-flex h-9 w-9 items-center justify-center text-[var(--lga-muted)] transition-colors hover:text-[var(--lga-ink)]"
        >
          {copied ? (
            <Check className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Share2 className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}
