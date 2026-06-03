import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import { ssgRoutes } from './app/routes';

export const createRoot = ViteReactSSG({
  routes: ssgRoutes,
  basename: import.meta.env.BASE_URL,
});
