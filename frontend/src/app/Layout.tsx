import { Outlet } from 'react-router-dom';
import Header from '../core/components/Header';
import Footer from '../core/components/Footer';

export default function Layout() {
  console.log('Test github actions');

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
