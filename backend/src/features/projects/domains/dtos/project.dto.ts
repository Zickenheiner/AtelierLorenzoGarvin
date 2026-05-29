import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class SpecDto {
  @ApiProperty({ example: 'Bois', description: 'Libellé de la spec' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'Noyer massif', description: 'Valeur de la spec' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class DrawingDto {
  @ApiProperty({
    example: '/uploads/commode-plan-1.png',
    description: 'URL/chemin de l’image du dessin',
  })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    example: 'Plan technique vue de face',
    description: 'Texte alternatif (accessibilité)',
  })
  @IsString()
  @IsNotEmpty()
  alt: string;
}

export class GalleryItemDto {
  @ApiProperty({
    example: '/uploads/commode-1.jpg',
    description: 'URL/chemin de l’image de la galerie',
  })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    example: 'Vue de face de la commode',
    description: 'Texte alternatif (accessibilité)',
  })
  @IsString()
  @IsNotEmpty()
  alt: string;
}

export class HeroDto {
  @ApiProperty({
    example: '/uploads/commode-hero.jpg',
    description: 'URL/chemin de l’image hero',
  })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    example: 'Commode en noyer massif — vue principale',
    description: 'Texte alternatif (accessibilité)',
  })
  @IsString()
  @IsNotEmpty()
  alt: string;
}

export class CreateProjectDto {
  @ApiProperty({
    example: 'Commode en noyer massif',
    description:
      'Titre du projet (le slug est généré automatiquement à partir de ce champ)',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Pièce inspirée du mobilier scandinave des années 60...',
    description: 'Narration / histoire détaillée',
  })
  @IsString()
  @IsNotEmpty()
  narrative: string;

  @ApiProperty({
    example: 'Une commode 4 tiroirs en noyer massif huilé.',
    description: 'Résumé court (200 caractères max)',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200, { message: 'Le résumé ne doit pas dépasser 200 caractères' })
  resume: string;

  @ApiProperty({
    type: HeroDto,
    description: 'Image hero (mise en avant) du projet',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => HeroDto)
  hero: HeroDto;

  @ApiProperty({
    type: [SpecDto],
    description: 'Spécifications techniques',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecDto)
  spec?: SpecDto[];

  @ApiProperty({
    type: [DrawingDto],
    description: 'Dessins / plans techniques',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DrawingDto)
  drawings?: DrawingDto[];

  @ApiProperty({
    type: [GalleryItemDto],
    description: 'Galerie de photos du projet',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryItemDto)
  gallery?: GalleryItemDto[];

  @ApiProperty({
    example: false,
    description:
      'Indique si le projet apparaît dans le carousel de la page accueil',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
