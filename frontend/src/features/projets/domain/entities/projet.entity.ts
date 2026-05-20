export interface ProjetSpec {
  label: string;
  value: string;
}

export interface ProjetImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjetDrawing {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjetNavigationLink {
  slug: string;
  label: string;
  title: string;
}

export interface ProjetEntity {
  slug: string;
  title: string;
  category: string;
  heroImage: ProjetImage;
  narrative: string[];
  specs: ProjetSpec[];
  drawings: ProjetDrawing[];
  gallery: {
    feature: ProjetImage;
    tall: ProjetImage;
    small: ProjetImage[];
  };
  previous?: ProjetNavigationLink;
  next?: ProjetNavigationLink;
}
