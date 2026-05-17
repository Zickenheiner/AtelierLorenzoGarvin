import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import ContactPage from '@/features/contact/presentation/pages/ContactPage';
import Layout from './Layout';
import routes from '@/core/constants/routes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<AccueilPage />} />
          <Route path={routes.contact} element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
