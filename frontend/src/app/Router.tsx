import routes from '@/core/constants/routes';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import PrestationsPage from '@/features/prestations/presentation/pages/PrestationsPage';
import ProjetPage from '@/features/projets/presentation/pages/ProjetPage';
import LoginPage from '@/features/auth/presentation/pages/LoginPage';
import AdminPage from '@/features/auth/presentation/pages/AdminPage';
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
        <Route path={routes.adminLogin} element={<LoginPage />} />

        {/* Routes privées admin */}
        <Route element={<Private redirect={routes.adminLogin} />}>
          <Route path={routes.admin} element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
