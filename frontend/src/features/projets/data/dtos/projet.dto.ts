export interface ProjetSpecDto {
  label: string;
  value: string;
}

export interface ProjetImageDto {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjetDrawingDto {
  url: string;
  alt: string;
  caption: string;
}

export interface ProjetNavigationDto {
  slug: string;
  label: string;
  title: string;
}

export interface ProjetResponseDto {
  slug: string;
  title: string;
  category: string;
  heroImage: ProjetImageDto;
  narrative: string[];
  specs: ProjetSpecDto[];
  drawings: ProjetDrawingDto[];
  gallery: {
    feature: ProjetImageDto;
    tall: ProjetImageDto;
    small: ProjetImageDto[];
  };
  previous?: ProjetNavigationDto;
  next?: ProjetNavigationDto;
}
