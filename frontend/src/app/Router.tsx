import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccueilPage from '@/features/accueil/presentation/pages/AccueilPage';
import Layout from './Layout';
import routes from '@/core/constants/routes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.home} element={<AccueilPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
