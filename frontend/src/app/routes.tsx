import { Toaster } from '@/core/components/ui/sonner';
import { queryClient } from '@/core/config/queryClient';
import routes from '@/core/constants/routes';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import AdminLoginPage from '@/features/admin/presentation/pages/AdminLoginPage';
import AdminProjetCreatePage from '@/features/admin/presentation/pages/AdminProjetCreatePage';
import AdminProjetEditPage from '@/features/admin/presentation/pages/AdminProjetEditPage';
import AdminProjetListPage from '@/features/admin/presentation/pages/AdminProjetListPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import PrestationsPage from '@/features/prestations/presentation/pages/PrestationsPage';
import ProjetPage from '@/features/projets/presentation/pages/ProjetPage';
import ProjetsListPage from '@/features/projets/presentation/pages/ProjetsListPage';
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
          { path: routes.prestations, element: <PrestationsPage /> },
          { path: routes.contact, element: <ContactPage /> },
          { path: routes.realisationsList, element: <ProjetsListPage /> },
          { path: routes.realisations(':slug'), element: <ProjetPage /> },
        ],
      },
      { path: routes.adminLogin, element: <AdminLoginPage /> },
      {
        element: <Private redirect={routes.adminLogin} />,
        children: [
          { path: routes.admin, element: <AdminProjetListPage /> },
          { path: routes.adminProjetNew, element: <AdminProjetCreatePage /> },
          {
            path: routes.adminProjetEdit(':id'),
            element: <AdminProjetEditPage />,
          },
        ],
      },
    ],
  },
];
