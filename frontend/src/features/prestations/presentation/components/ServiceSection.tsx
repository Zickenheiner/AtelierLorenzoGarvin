import { cn } from '@/core/utils/cn';

interface Props {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
}

export default function ServiceSection({
  number,
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse,
}: Props) {
  return (
    <section className="w-full bg-lga-bg">
      <div
        className={cn(
          'mx-auto grid max-w-[1216px] grid-cols-1 gap-12 lg:grid-cols-[478px_1fr] lg:gap-16',
          reverse && 'lg:grid-cols-[1fr_478px]',
        )}
      >
        <div className={cn('flex flex-col gap-6', reverse && 'lg:order-2')}>
          <span
            className="text-[11px] leading-[16.5px] tracking-[0.2em] text-lga-muted uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            {number} / {eyebrow}
          </span>
          <h2
            className="text-[35px] leading-[60px] tracking-[-0.02em] text-black"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            {title}
          </h2>
          <p
            className="whitespace-pre-line text-justify text-[17px] leading-[1.85] text-[#5f5e5e]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            {body}
          </p>
        </div>

        <div
          className={cn(
            'flex items-center justify-center bg-[var(--lga-surface)]',
            reverse && 'lg:order-1',
          )}
        >
          <img
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
