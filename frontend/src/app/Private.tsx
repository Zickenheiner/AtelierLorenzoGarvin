import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '@/core/local/storage';
import { useMe } from '@/features/auth/domain/hooks/auth.hook';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  redirect: string;
}

export default function Private({ redirect }: Props) {
  const location = useLocation();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const hasAnyToken = Boolean(accessToken || refreshToken);

  const { isLoading, isError, isSuccess } = useMe(hasAnyToken);

  if (!hasAnyToken) {
    clearTokens();
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center text-[12px] tracking-[0.2em] text-[var(--lga-muted)] uppercase">
        Vérification…
      </div>
    );
  }

  if (isError) {
    clearTokens();
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  if (!isSuccess) {
    return null;
  }

  return <Outlet />;
}
