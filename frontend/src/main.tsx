import './index.css';
import {
  dehydrate,
  hydrate,
  type DehydratedState,
} from '@tanstack/react-query';
import { ViteReactSSG } from 'vite-react-ssg';
import { ssgRoutes } from './app/routes';
import { queryClient } from './core/config/queryClient';
import { ProjetRepositoryImpl } from './features/projets/data/repositories/projet.repository.impl';
import {
  PROJETS_QUERY_KEY,
  projetQueryKey,
} from './features/projets/domain/hooks/projet.hook';

interface SsgState {
  dehydratedState?: DehydratedState;
}

let prefetched = false;

async function prefetchProjets() {
  if (prefetched) return;
  try {
    const projets = await new ProjetRepositoryImpl().findAll();
    queryClient.setQueryData(PROJETS_QUERY_KEY, projets);
    for (const projet of projets) {
      queryClient.setQueryData(projetQueryKey(projet.slug), projet);
    }
    prefetched = true;
  } catch (error) {
    console.warn(
      '[SSG] Préchargement des projets ignoré (API injoignable au build) :',
      error instanceof Error ? error.message : error,
    );
  }
}

export const createRoot = ViteReactSSG(
  { routes: ssgRoutes, basename: import.meta.env.BASE_URL },
  async ({ isClient, initialState }) => {
    const state = initialState as SsgState;
    if (isClient) {
      if (state.dehydratedState) {
        hydrate(queryClient, state.dehydratedState);
      }
    } else {
      await prefetchProjets();
      state.dehydratedState = dehydrate(queryClient);
    }
  },
);
