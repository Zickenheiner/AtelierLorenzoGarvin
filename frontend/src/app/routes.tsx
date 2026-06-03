import { Toaster } from '@/core/components/ui/sonner';
import { queryClient } from '@/core/config/queryClient';
import routes from '@/core/constants/routes';
import type { ProjetEntity } from '@/features/projets/domain/entities/projet.entity';
import { ProjetRepositoryImpl } from '@/features/projets/data/repositories/projet.repository.impl';
import {
  PROJETS_QUERY_KEY,
  projetQueryKey,
} from '@/features/projets/domain/hooks/projet.hook';
import {
  dehydrate,
  HydrationBoundary,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import type { ComponentType } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Private from './Private';

function page(factory: () => Promise<{ default: ComponentType }>) {
  return () => factory().then((module) => ({ Component: module.default }));
}

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

export const ssgRoutes: RouteRecord[] = [
  {
    path: routes.home,
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            lazy: page(
              () => import('@/features/accueil/presentation/pages/AccueilPage'),
            ),
          },
          {
            path: 'prestations',
            lazy: page(
              () =>
                import('@/features/prestations/presentation/pages/PrestationsPage'),
            ),
          },
          {
            path: 'contact',
            lazy: page(
              () => import('@/features/contact/presentation/pages/ContactPage'),
            ),
          },
          {
            path: 'projets',
            lazy: page(
              () =>
                import('@/features/projets/presentation/pages/ProjetsListPage'),
            ),
          },
          {
            path: 'projets/:slug',
            lazy: page(
              () => import('@/features/projets/presentation/pages/ProjetPage'),
            ),
          },
        ],
      },

      {
        path: 'admin/login',
        lazy: page(
          () => import('@/features/admin/presentation/pages/AdminLoginPage'),
        ),
      },

      {
        element: <Private redirect={routes.adminLogin} />,
        children: [
          {
            path: 'admin',
            lazy: page(
              () =>
                import('@/features/admin/presentation/pages/AdminProjetListPage'),
            ),
          },
          {
            path: 'admin/projets/nouveau',
            lazy: page(
              () =>
                import('@/features/admin/presentation/pages/AdminProjetCreatePage'),
            ),
          },
          {
            path: 'admin/projets/:id/modifier',
            lazy: page(
              () =>
                import('@/features/admin/presentation/pages/AdminProjetEditPage'),
            ),
          },
        ],
      },
    ],
  },
];
