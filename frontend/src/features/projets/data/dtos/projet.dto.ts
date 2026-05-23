export interface ProjetSpecDto {
  label: string;
  value: string;
}

export interface ProjetDrawingDto {
  img: string;
  alt: string;
}

export interface ProjetGalleryItemDto {
  img: string;
  alt: string;
}

export interface ProjetHeroDto {
  img: string;
  alt: string;
}

export interface ProjetResponseDto {
  id: string;
  slug: string;
  title: string;
  narrative: string;
  resume: string;
  hero: ProjetHeroDto;
  spec: ProjetSpecDto[];
  drawings: ProjetDrawingDto[];
  gallery: ProjetGalleryItemDto[];
  featured: boolean;
}

export interface ProjetCreateRequestDto {
  title: string;
  narrative: string;
  resume: string;
  hero: ProjetHeroDto;
  spec: ProjetSpecDto[];
  drawings?: ProjetDrawingDto[];
  gallery?: ProjetGalleryItemDto[];
  featured?: boolean;
}

export type ProjetUpdateRequestDto = Partial<ProjetCreateRequestDto>;
