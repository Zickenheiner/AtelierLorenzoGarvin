import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { AnimatePresence, motion } from 'motion/react';

interface LightboxImage {
  src: string;
  alt: string;
}

interface Props {
  images: LightboxImage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex?: number;
}

export default function Lightbox({
  images,
  open,
  onOpenChange,
  initialIndex = 0,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setDirection(0);
    }
  }, [open, initialIndex]);

  if (images.length === 0) return null;

  const current = images[index];
  const hasMultiple = images.length > 1;

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          onKeyDown={(e) => {
            if (!hasMultiple) return;
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            {current.alt || 'Image en plein écran'}
          </DialogPrimitive.Title>

          <DialogPrimitive.Close
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative flex h-full w-full items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={index}
                src={current.src}
                alt={current.alt}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir === 0 ? 0 : dir > 0 ? 120 : -120,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -120 : 120,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 360, damping: 32 },
                  opacity: { duration: 0.15 },
                }}
                className="absolute max-h-[90vh] max-w-[90vw] object-contain"
              />
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
