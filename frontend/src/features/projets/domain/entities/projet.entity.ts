export interface ProjetSpec {
  label: string;
  value: string;
}

export interface ProjetDrawing {
  img: string;
  alt: string;
}

export interface ProjetGalleryItem {
  img: string;
  alt: string;
}

export interface ProjetHero {
  img: string;
  alt: string;
}

export interface ProjetEntity {
  id: string;
  slug: string;
  title: string;
  narrative: string;
  resume: string;
  hero: ProjetHero;
  spec: ProjetSpec[];
  drawings: ProjetDrawing[];
  gallery: ProjetGalleryItem[];
}
