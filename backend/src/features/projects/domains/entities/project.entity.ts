import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Drawing, GalleryItem, Hero, Spec } from '../schemas/project.schema';

export class ProjectEntity {
  @ApiProperty({
    example: '68b4d59919d9b7a94b4fde21',
    description: 'Identifiant unique MongoDB du projet',
  })
  private readonly id: mongoose.Types.ObjectId;

  @ApiProperty({
    example: 'commode-noyer-massif',
    description: 'Slug unique du projet (utilisé dans les URLs)',
  })
  private readonly slug: string;

  @ApiProperty({
    example: 'Commode en noyer massif',
    description: 'Titre du projet',
  })
  private readonly title: string;

  @ApiProperty({
    example: 'Pièce inspirée du mobilier scandinave des années 60...',
    description: 'Narration / histoire détaillée du projet',
  })
  private readonly narrative: string;

  @ApiProperty({
    example: 'Une commode 4 tiroirs en noyer massif huilé.',
    description: 'Résumé court du projet',
  })
  private readonly resume: string;

  @ApiProperty({
    example: {
      img: '/uploads/commode-hero.jpg',
      alt: 'Commode en noyer massif — vue principale',
    },
    description: 'Image hero (mise en avant) du projet',
  })
  private readonly hero: Hero;

  @ApiProperty({
    example: [
      { label: 'Bois', value: 'Noyer massif' },
      { label: 'Dimensions', value: '120 x 45 x 80 cm' },
    ],
    description: 'Spécifications techniques du projet',
  })
  private readonly spec: Spec[];

  @ApiProperty({
    example: [
      {
        img: '/uploads/commode-plan-1.png',
        alt: 'Plan technique vue de face',
      },
    ],
    description: 'Dessins / plans techniques du projet',
  })
  private readonly drawings: Drawing[];

  @ApiProperty({
    example: [
      { img: '/uploads/commode-1.jpg', alt: 'Vue de face' },
      { img: '/uploads/commode-2.jpg', alt: 'Détail du tiroir' },
    ],
    description: 'Galerie de photos du projet',
  })
  private readonly gallery: GalleryItem[];

  @ApiProperty({
    example: true,
    description:
      'Indique si le projet apparaît dans le carousel de la page accueil',
  })
  private readonly featured: boolean;

  @ApiProperty({
    example: 0,
    description:
      "Position d'affichage du projet (ordre croissant) dans les listes",
  })
  private readonly order: number;

  constructor(
    _id: mongoose.Types.ObjectId,
    slug: string,
    title: string,
    narrative: string,
    resume: string,
    hero: Hero,
    spec: Spec[],
    drawings: Drawing[],
    gallery: GalleryItem[],
    featured: boolean,
    order: number,
  ) {
    this.id = _id;
    this.slug = slug;
    this.title = title;
    this.narrative = narrative;
    this.resume = resume;
    this.hero = hero;
    this.spec = spec;
    this.drawings = drawings;
    this.gallery = gallery;
    this.featured = featured;
    this.order = order;
  }

  // ———————GETTER———————

  getId(): string {
    return this.id.toString();
  }

  getObjectId(): mongoose.Types.ObjectId {
    return this.id;
  }

  getSlug(): string {
    return this.slug;
  }

  getTitle(): string {
    return this.title;
  }

  getNarrative(): string {
    return this.narrative;
  }

  getResume(): string {
    return this.resume;
  }

  getHero(): Hero {
    return this.hero;
  }

  getSpec(): Spec[] {
    return this.spec;
  }

  getDrawings(): Drawing[] {
    return this.drawings;
  }

  getGallery(): GalleryItem[] {
    return this.gallery;
  }

  getFeatured(): boolean {
    return this.featured;
  }

  getOrder(): number {
    return this.order;
  }
}
