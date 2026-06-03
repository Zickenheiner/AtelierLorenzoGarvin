import { Toaster } from '@/core/components/ui/sonner';
import { queryClient } from '@/core/config/queryClient';
import routes from '@/core/constants/routes';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import PrestationsPage from '@/features/prestations/presentation/pages/PrestationsPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import ProjetsListPage from '@/features/projets/presentation/pages/ProjetsListPage';
import ProjetPage from '@/features/projets/presentation/pages/ProjetPage';
import AdminLoginPage from '@/features/admin/presentation/pages/AdminLoginPage';
import AdminProjetListPage from '@/features/admin/presentation/pages/AdminProjetListPage';
import AdminProjetCreatePage from '@/features/admin/presentation/pages/AdminProjetCreatePage';
import AdminProjetEditPage from '@/features/admin/presentation/pages/AdminProjetEditPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Private from './Private';

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export const ssgRoutes: RouteRecord[] = [
  {
    path: routes.home,
    element: <Root />,
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
