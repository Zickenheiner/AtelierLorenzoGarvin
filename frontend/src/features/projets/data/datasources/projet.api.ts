import type { ProjetResponseDto } from '../dtos/projet.dto';

// TODO : remplacer par un appel via `request` quand l'endpoint backend `/projets/:slug`
// sera disponible. Pour l'instant, on retourne les données mockées en mémoire.
const MOCK_PROJETS: Record<string, ProjetResponseDto> = {
  'code-projet': {
    slug: 'code-projet',
    title: 'Code Projet',
    heroImage: {
      url: '/images/projet-hero.png',
      alt: 'Maison monolithique en béton — vue extérieure',
    },
    narrative: [
      'Located on the rugged cliffs of the Scandinavian coastline, The Silent Observatory is a study in thermal mass and light modulation. The design intent was to create a dwelling that disappears into the landscape while providing a fortified interior sanctuary.',
      'Utilizing local site-cast concrete and reclaimed oak, the structure functions as a series of connected monoliths. Each volume is oriented toward specific celestial events, allowing the passage of time to be tracked through the movement of light across the internal gallery walls.',
    ],
    specs: [
      { label: 'Programme', value: 'Maison individuelle' },
      { label: 'Localisation', value: 'Scandinavie' },
      { label: 'Maître d’ouvrage', value: 'Privé' },
      { label: 'Surface', value: '320 m²' },
      { label: 'Type de mission', value: 'Mission complète' },
    ],
    drawings: [
      {
        url: '/images/projet-floor-plan.png',
        alt: 'Plan de niveau RDC',
        caption: 'Level 01 / Ground Plan',
      },
      {
        url: '/images/projet-cross-section.png',
        alt: 'Coupe A-A — intégration topographique',
        caption: 'Section A-A / Topography Integration',
      },
    ],
    gallery: {
      feature: {
        url: '/images/projet-staircase.png',
        alt: 'Escalier intérieur en béton',
        caption: 'Interior / Circulation',
      },
      tall: {
        url: '/images/projet-window.png',
        alt: 'Vue depuis la fenêtre',
      },
      small: [
        { url: '/images/projet-material.png', alt: 'Texture des matériaux' },
        { url: '/images/projet-exterior.png', alt: 'Détail extérieur' },
        { url: '/images/projet-light-shadow.png', alt: 'Lumière et ombre' },
      ],
    },
    previous: {
      slug: 'urban-monolith',
      label: 'Précèdent',
      title: 'Urban Monolith',
    },
    next: {
      slug: 'the-glass-pavilion',
      label: 'Suivant',
      title: 'The Glass Pavilion',
    },
  },
};

export class ProjetApi {
  async findBySlug(slug: string): Promise<ProjetResponseDto | null> {
    await new Promise((r) => setTimeout(r, 0));
    return MOCK_PROJETS[slug] ?? MOCK_PROJETS['code-projet'] ?? null;
  }
}
