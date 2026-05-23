import { useParams } from 'react-router-dom';
import { useProjet } from '../../domain/hooks/projet.hook';
import ProjetDrawings from '../components/ProjetDrawings';
import ProjetGallery from '../components/ProjetGallery';
import ProjetHero from '../components/ProjetHero';
import ProjetNarrative from '../components/ProjetNarrative';

export default function ProjetPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: projet, isLoading, error } = useProjet(slug);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[var(--lga-muted)]">
        Chargement…
      </div>
    );
  }

  if (error || !projet) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-[var(--lga-ink)]">
          Projet introuvable
          {slug ? ` : « ${slug} »` : ''}.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ProjetHero projet={projet} />
      <ProjetNarrative projet={projet} />
      <ProjetDrawings projet={projet} />
      <ProjetGallery projet={projet} />
    </div>
  );
}
