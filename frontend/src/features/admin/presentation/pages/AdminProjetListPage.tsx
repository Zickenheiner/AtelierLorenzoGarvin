import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import routes from '@/core/constants/routes';
import { toAssetUrl } from '@/core/utils/asset-url';
import { useLogout, useMe } from '@/features/admin/domain/hooks/auth.hook';
import type { ProjetEntity } from '@/features/projets/domain/entities/projet.entity';
import {
  useDeleteProjet,
  useProjets,
} from '@/features/projets/domain/hooks/projet.hook';
import { Eye, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminProjetListPage() {
  const navigate = useNavigate();
  const { data: admin } = useMe();
  const logout = useLogout();
  const { data: projets, isLoading, error } = useProjets();
  const deleteProjet = useDeleteProjet();
  const [toDelete, setToDelete] = useState<ProjetEntity | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    setDeleteError(null);
    try {
      await deleteProjet.mutateAsync(toDelete.id);
      setToDelete(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const handleLogout = async () => {
    await logout.mutateAsync();
    navigate(routes.adminLogin, { replace: true });
  };

  return (
    <main className="min-h-[100dvh] bg-[var(--lga-surface)] px-6 py-12">
      <div className="mx-auto w-full max-w-[1216px]">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1
              className="text-[28px] leading-[36px] tracking-[-0.02em] text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
            >
              Projets
            </h1>
            <p
              className="mt-1 text-[13px] tracking-[0.05em] text-[var(--lga-muted)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {admin
                ? `Connecté en tant que ${admin.identifiant}`
                : 'Espace administrateur'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={routes.adminProjetNew}
              className="inline-flex h-[40px] items-center gap-2 bg-black px-5 text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Ajouter
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="inline-flex h-[40px] items-center gap-2 border border-[#c6c6c6] px-4 text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase transition-colors hover:border-[var(--lga-ink)] hover:text-[var(--lga-ink)] disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              {logout.isPending ? 'Déconnexion…' : 'Déconnexion'}
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center text-[var(--lga-muted)]">
            Chargement…
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600"
          >
            Erreur : {error.message}
          </div>
        ) : !projets || projets.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-sm bg-white p-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <p
              className="text-[15px] text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Aucun projet pour le moment.
            </p>
            <Link
              to={routes.adminProjetNew}
              className="inline-flex h-[40px] items-center gap-2 bg-black px-5 text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Créer le premier projet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projets.map((projet) => (
              <article
                key={projet.id}
                className="flex flex-col overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-[4/3] w-full bg-[var(--lga-surface)]">
                  <img
                    src={toAssetUrl(projet.hero.img)}
                    alt={projet.hero.alt || projet.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex flex-col gap-1">
                    <h2
                      className="text-[18px] leading-6 tracking-[-0.01em] text-[var(--lga-ink)]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                      }}
                    >
                      {projet.title}
                    </h2>
                    <p className="font-mono text-[11px] tracking-[0.05em] text-[var(--lga-muted)]">
                      /{projet.slug}
                    </p>
                  </div>

                  <p
                    className="line-clamp-3 text-[13px] leading-[1.6] text-[var(--lga-muted)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {projet.resume}
                  </p>

                  <div className="mt-auto flex items-center gap-2 border-t border-[var(--lga-footer)] pt-4">
                    <Link
                      to={routes.projets(projet.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Voir la page publique"
                      className="inline-flex h-[36px] flex-1 items-center justify-center gap-1.5 border border-[#e4e4e4] text-[10px] tracking-[0.2em] text-[var(--lga-ink)] uppercase transition-colors hover:border-[var(--lga-ink)]"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Voir
                    </Link>
                    <Link
                      to={routes.adminProjetEdit(projet.id)}
                      title="Modifier"
                      className="inline-flex h-[36px] flex-1 items-center justify-center gap-1.5 border border-[var(--lga-ink)] bg-[var(--lga-ink)] text-[10px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Modifier
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError(null);
                        setToDelete(projet);
                      }}
                      title="Supprimer"
                      className="inline-flex h-[36px] w-[36px] items-center justify-center border border-[#e4e4e4] text-[var(--lga-muted)] transition-colors hover:border-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!toDelete}
        onOpenChange={(open) => {
          if (!open) {
            setToDelete(null);
            setDeleteError(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le projet ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Le projet «&nbsp;
              <strong>{toDelete?.title}</strong>&nbsp;» sera supprimé
              définitivement.
            </DialogDescription>
          </DialogHeader>

          {deleteError ? (
            <div
              role="alert"
              className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600"
            >
              {deleteError}
            </div>
          ) : null}

          <DialogFooter>
            <button
              type="button"
              onClick={() => setToDelete(null)}
              disabled={deleteProjet.isPending}
              className="inline-flex h-[40px] items-center justify-center border border-[#c6c6c6] px-5 text-[11px] tracking-[0.2em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-70 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleteProjet.isPending}
              className="inline-flex h-[40px] items-center justify-center bg-red-600 px-5 text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              {deleteProjet.isPending ? 'Suppression…' : 'Supprimer'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
