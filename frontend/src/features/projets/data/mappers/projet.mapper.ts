import type { ProjetEntity } from '../../domain/entities/projet.entity';
import type { ProjetResponseDto } from '../dtos/projet.dto';

export class ProjetMapper {
  static toEntity(dto: ProjetResponseDto): ProjetEntity {
    return {
      id: dto.id,
      slug: dto.slug,
      title: dto.title,
      narrative: dto.narrative,
      resume: dto.resume,
      hero: { img: dto.hero.img, alt: dto.hero.alt },
      spec: dto.spec.map((s) => ({ label: s.label, value: s.value })),
      drawings: dto.drawings.map((d) => ({ img: d.img, alt: d.alt })),
      gallery: dto.gallery.map((g) => ({ img: g.img, alt: g.alt })),
    };
  }
}
