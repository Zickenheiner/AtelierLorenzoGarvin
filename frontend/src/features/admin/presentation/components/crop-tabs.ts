export interface CropFieldTab {
  key: string;
  label: string;
  aspect: number;
  field: 'img' | 'imgCarousel' | 'imgThumbnail';
}

export const HERO_CROP_TABS: CropFieldTab[] = [
  { key: 'hero', label: 'Bandeau (16/9)', aspect: 16 / 9, field: 'img' },
  {
    key: 'carousel',
    label: 'Carousel (3/2)',
    aspect: 3 / 2,
    field: 'imgCarousel',
  },
  {
    key: 'thumbnail',
    label: 'Vignette (1/1)',
    aspect: 1,
    field: 'imgThumbnail',
  },
];

export const DRAWING_CROP_TABS: CropFieldTab[] = [
  { key: 'main', label: 'Dessin (1/1)', aspect: 1, field: 'img' },
];

export const GALLERY_CROP_TABS: CropFieldTab[] = [
  { key: 'main', label: 'Galerie (4/3)', aspect: 4 / 3, field: 'img' },
];
