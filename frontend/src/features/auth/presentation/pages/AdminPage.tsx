import { useNavigate } from 'react-router-dom';
import { useLogout, useMe } from '../../domain/hooks/auth.hook';
import routes from '@/core/constants/routes';

export default function AdminPage() {
  const navigate = useNavigate();
  const { data: admin, isLoading } = useMe();
  const logout = useLogout();

  const onLogout = async () => {
    await logout.mutateAsync();
    navigate(routes.adminLogin, { replace: true });
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--lga-surface)] px-6 py-12">
      <div className="w-full max-w-[520px] rounded-sm bg-white p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <h1
          className="mb-2 text-[24px] leading-[32px] tracking-[-0.02em] text-[var(--lga-ink)]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
        >
          Espace administrateur
        </h1>
        <p
          className="mb-8 text-[14px] tracking-[0.05em] text-[var(--lga-muted)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {isLoading
            ? 'Chargement…'
            : admin
              ? `Connecté en tant que ${admin.identifiant}`
              : 'Session active'}
        </p>

        <button
          type="button"
          onClick={onLogout}
          disabled={logout.isPending}
          className="inline-flex h-[44px] items-center justify-center bg-black px-6 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
        >
          {logout.isPending ? 'Déconnexion…' : 'Se déconnecter'}
        </button>
      </div>
    </main>
  );
}
