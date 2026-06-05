import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  ProjetCreateRequestDto,
  ProjetUpdateRequestDto,
} from '../../data/dtos/projet.dto';
import { ProjetRepositoryImpl } from '../../data/repositories/projet.repository.impl';
import type { ProjetEntity } from '../entities/projet.entity';

const projetRepository = new ProjetRepositoryImpl();

export const PROJETS_QUERY_KEY = ['projets'] as const;
export const projetQueryKey = (slug: string | undefined) =>
  ['projet', slug] as const;
const projetByIdQueryKey = (id: string | undefined) =>
  ['projet', 'id', id] as const;

export const useProjets = () => {
  return useQuery<ProjetEntity[], Error>({
    queryKey: PROJETS_QUERY_KEY,
    queryFn: () => projetRepository.findAll(),
  });
};

export const useProjet = (slug: string | undefined) => {
  return useQuery<ProjetEntity | null, Error>({
    queryKey: projetQueryKey(slug),
    queryFn: () =>
      slug ? projetRepository.findBySlug(slug) : Promise.resolve(null),
    enabled: !!slug,
  });
};

export const useProjetById = (id: string | undefined) => {
  return useQuery<ProjetEntity | null, Error>({
    queryKey: projetByIdQueryKey(id),
    queryFn: () => (id ? projetRepository.findById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
};

export const useCreateProjet = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, ProjetCreateRequestDto>({
    mutationFn: (data) => projetRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJETS_QUERY_KEY });
    },
  });
};

export const useUpdateProjet = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, ProjetUpdateRequestDto>({
    mutationFn: (data) => projetRepository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJETS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: projetByIdQueryKey(id) });
    },
  });
};

export const useDeleteProjet = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: (id) => projetRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJETS_QUERY_KEY });
    },
  });
};

export const useReorderProjets = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string[], { previous?: ProjetEntity[] }>({
    mutationFn: (ids) => projetRepository.reorder(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: PROJETS_QUERY_KEY });
      const previous =
        queryClient.getQueryData<ProjetEntity[]>(PROJETS_QUERY_KEY);
      if (previous) {
        const byId = new Map(previous.map((p) => [p.id, p]));
        const next = ids
          .map((id) => byId.get(id))
          .filter((p): p is ProjetEntity => Boolean(p));
        queryClient.setQueryData<ProjetEntity[]>(PROJETS_QUERY_KEY, next);
      }
      return { previous };
    },
    onError: (_err, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(PROJETS_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROJETS_QUERY_KEY });
    },
  });
};
