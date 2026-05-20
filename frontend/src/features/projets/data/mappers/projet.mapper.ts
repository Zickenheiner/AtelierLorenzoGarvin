import type {
  ProjetDrawing,
  ProjetEntity,
  ProjetImage,
  ProjetNavigationLink,
  ProjetSpec,
} from '../../domain/entities/projet.entity';
import type {
  ProjetDrawingDto,
  ProjetImageDto,
  ProjetNavigationDto,
  ProjetResponseDto,
  ProjetSpecDto,
} from '../dtos/projet.dto';

export class ProjetMapper {
  static toEntity(dto: ProjetResponseDto): ProjetEntity {
    return {
      slug: dto.slug,
      title: dto.title,
      category: dto.category,
      heroImage: this.image(dto.heroImage),
      narrative: dto.narrative,
      specs: dto.specs.map(this.spec),
      drawings: dto.drawings.map(this.drawing),
      gallery: {
        feature: this.image(dto.gallery.feature),
        tall: this.image(dto.gallery.tall),
        small: dto.gallery.small.map(this.image),
      },
      previous: dto.previous ? this.nav(dto.previous) : undefined,
      next: dto.next ? this.nav(dto.next) : undefined,
    };
  }

  private static spec(dto: ProjetSpecDto): ProjetSpec {
    return { label: dto.label, value: dto.value };
  }

  private static image(dto: ProjetImageDto): ProjetImage {
    return { src: dto.url, alt: dto.alt, caption: dto.caption };
  }

  private static drawing(dto: ProjetDrawingDto): ProjetDrawing {
    return { src: dto.url, alt: dto.alt, caption: dto.caption };
  }

  private static nav(dto: ProjetNavigationDto): ProjetNavigationLink {
    return { slug: dto.slug, label: dto.label, title: dto.title };
  }
}
