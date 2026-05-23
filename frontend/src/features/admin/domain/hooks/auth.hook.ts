import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthRepositoryImpl } from '../../data/repositories/auth.repository.impl';
import {
  clearTokens,
  setAccessToken,
  setRefreshToken,
} from '@/core/local/storage';
import type { AdminEntity, AuthSession } from '../entities/admin.entity';

const authRepository = new AuthRepositoryImpl();

export const ME_QUERY_KEY = ['auth', 'me'] as const;

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AuthSession,
    Error,
    { identifiant: string; password: string }
  >({
    mutationFn: ({ identifiant, password }) =>
      authRepository.login(identifiant, password),
    onSuccess: (session) => {
      setAccessToken(session.accessToken);
      setRefreshToken(session.refreshToken);
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: () => authRepository.logout(),
    onSettled: () => {
      clearTokens();
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
    },
  });
};

export const useMe = (enabled = true) => {
  return useQuery<AdminEntity, Error>({
    queryKey: ME_QUERY_KEY,
    queryFn: () => authRepository.me(),
    enabled,
    retry: false,
  });
};
