import { Toaster } from '@/core/components/ui/sonner';
import { queryClient } from '@/core/config/queryClient';
import routes from '@/core/constants/routes';
import type { ProjetEntity } from '@/features/projets/domain/entities/projet.entity';
import { ProjetRepositoryImpl } from '@/features/projets/data/repositories/projet.repository.impl';
import {
  PROJETS_QUERY_KEY,
  projetQueryKey,
} from '@/features/projets/domain/hooks/projet.hook';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import PrestationsPage from '@/features/prestations/presentation/pages/PrestationsPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import ProjetsListPage from '@/features/projets/presentation/pages/ProjetsListPage';
import ProjetPage from '@/features/projets/presentation/pages/ProjetPage';
import AdminLoginPage from '@/features/admin/presentation/pages/AdminLoginPage';
import AdminProjetListPage from '@/features/admin/presentation/pages/AdminProjetListPage';
import AdminProjetCreatePage from '@/features/admin/presentation/pages/AdminProjetCreatePage';
import AdminProjetEditPage from '@/features/admin/presentation/pages/AdminProjetEditPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import { Outlet, useLoaderData } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Private from './Private';

let projetsCache: ProjetEntity[] | null = null;

async function loadProjetsOnce(): Promise<ProjetEntity[]> {
  if (projetsCache) return projetsCache;
  projetsCache = await new ProjetRepositoryImpl().findAll();
  return projetsCache;
}

async function rootLoader(): Promise<DehydratedState> {
  try {
    const projets = await loadProjetsOnce();
    queryClient.setQueryData(PROJETS_QUERY_KEY, projets);
    for (const projet of projets) {
      queryClient.setQueryData(projetQueryKey(projet.slug), projet);
    }
  } catch (error) {
    console.warn(
      '[SSG] Préchargement des projets ignoré (API injoignable au build) :',
      error instanceof Error ? error.message : error,
    );
  }
  return dehydrate(queryClient);
}

function Root() {
  const dehydratedState = useLoaderData() as DehydratedState | undefined;
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Outlet />
      </HydrationBoundary>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

function RootHydrateFallback() {
  return null;
}

export const ssgRoutes: RouteRecord[] = [
  {
    path: routes.home,
    element: <Root />,
    loader: rootLoader,
    HydrateFallback: RootHydrateFallback,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <AccueilPage /> },
          { path: 'prestations', element: <PrestationsPage /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'projets', element: <ProjetsListPage /> },
          { path: 'projets/:slug', element: <ProjetPage /> },
        ],
      },
      { path: 'admin/login', element: <AdminLoginPage /> },
      {
        element: <Private redirect={routes.adminLogin} />,
        children: [
          { path: 'admin', element: <AdminProjetListPage /> },
          { path: 'admin/projets/nouveau', element: <AdminProjetCreatePage /> },
          {
            path: 'admin/projets/:id/modifier',
            element: <AdminProjetEditPage />,
          },
        ],
      },
    ],
  },
];
