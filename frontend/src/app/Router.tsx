import routes from '@/core/constants/routes';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import AdminLoginPage from '@/features/admin/presentation/pages/AdminLoginPage';
import AdminProjetCreatePage from '@/features/admin/presentation/pages/AdminProjetCreatePage';
import AdminProjetEditPage from '@/features/admin/presentation/pages/AdminProjetEditPage';
import AdminProjetListPage from '@/features/admin/presentation/pages/AdminProjetListPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import PrestationsPage from '@/features/prestations/presentation/pages/PrestationsPage';
import ProjetPage from '@/features/projets/presentation/pages/ProjetPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Private from './Private';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques avec Layout (header + footer) */}
        <Route element={<Layout />}>
          <Route path={routes.home} element={<AccueilPage />} />
          <Route path={routes.prestations} element={<PrestationsPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
          <Route path={routes.projet} element={<ProjetPage />} />
        </Route>

        {/* Login admin — pas de Layout, page autonome */}
        <Route path={routes.adminLogin} element={<AdminLoginPage />} />

        {/* Routes privées admin */}
        <Route element={<Private redirect={routes.adminLogin} />}>
          <Route path={routes.admin} element={<AdminProjetListPage />} />
          <Route
            path={routes.adminProjetNew}
            element={<AdminProjetCreatePage />}
          />
          <Route
            path={routes.adminProjetEdit}
            element={<AdminProjetEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
