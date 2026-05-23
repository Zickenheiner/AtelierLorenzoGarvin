import { Container } from '@/core/components/ui/container';
import { Section } from '@/core/components/ui/section';
import type { ProjetEntity } from '../../domain/entities/projet.entity';

interface Props {
  projet: ProjetEntity;
}

export default function ProjetNarrative({ projet }: Props) {
  const paragraphs = projet.narrative
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_65%] lg:gap-16">
          <dl className="flex flex-col">
            {projet.spec.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 border-b border-[var(--lga-footer)] py-4 last:border-b-0"
              >
                <dt
                  className="text-[12px] tracking-[0.05em] text-[var(--lga-ink)] uppercase"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
                >
                  {spec.label}
                </dt>
                <dd
                  className="text-[12px] text-end tracking-[0.08em] text-[var(--lga-muted)]"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-6">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-[17px] leading-[1.85] text-[var(--lga-ink)] sm:text-[18px]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
