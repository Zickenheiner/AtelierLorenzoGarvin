import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '@/core/local/storage';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from './Layout';

interface Props {
  redirect: string;
}

export default function Public({ redirect }: Props) {
  const location = useLocation();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken && !refreshToken) {
    clearTokens();
    return <Layout />;
  }

  return <Navigate to={redirect} state={{ from: location }} replace />;
}
