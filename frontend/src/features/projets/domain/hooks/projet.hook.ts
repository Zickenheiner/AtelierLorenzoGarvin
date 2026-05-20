import { useQuery } from '@tanstack/react-query';
import { ProjetRepositoryImpl } from '../../data/repositories/projet.repository.impl';
import type { ProjetEntity } from '../entities/projet.entity';

const projetRepository = new ProjetRepositoryImpl();

export const useProjet = (slug: string | undefined) => {
  return useQuery<ProjetEntity | null, Error>({
    queryKey: ['projet', slug],
    queryFn: () =>
      slug ? projetRepository.findBySlug(slug) : Promise.resolve(null),
    enabled: !!slug,
  });
};
