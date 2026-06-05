import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { Container } from '@/core/components/ui/container';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/core/components/ui/dialog';
import { EmptyState } from '@/core/components/ui/empty-state';
import { ErrorAlert } from '@/core/components/ui/error-alert';
import { Heading } from '@/core/components/ui/heading';
import { LoadingState } from '@/core/components/ui/loading-state';
import { Switch } from '@/core/components/ui/switch';
import routes from '@/core/constants/routes';
import { toAssetUrl } from '@/core/utils/asset-url';
import { useLogout, useMe } from '@/features/admin/domain/hooks/auth.hook';
import { SortableProjetCard } from '@/features/admin/presentation/components/SortableProjetCard';
import type { ProjetEntity } from '@/features/projets/domain/entities/projet.entity';
import {
  useDeleteProjet,
  useProjets,
  useReorderProjets,
  useUpdateProjet,
} from '@/features/projets/domain/hooks/projet.hook';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Eye, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminProjetListPage() {
  const navigate = useNavigate();
  const { data: admin } = useMe();
  const logout = useLogout();
  const { data: projets, isLoading, error } = useProjets();
  const deleteProjet = useDeleteProjet();
  const reorderProjets = useReorderProjets();
  const [orderedProjets, setOrderedProjets] = useState<ProjetEntity[]>([]);

  useEffect(() => {
    setOrderedProjets(projets ?? []);
  }, [projets]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedProjets.findIndex((p) => p.id === active.id);
    const newIndex = orderedProjets.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const next = arrayMove(orderedProjets, oldIndex, newIndex);
    setOrderedProjets(next);
    reorderProjets.mutate(next.map((p) => p.id));
  };

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

  const displayedProjets =
    orderedProjets.length > 0 ? orderedProjets : (projets ?? []);

  return (
    <main className="min-h-[100dvh] bg-[var(--lga-surface)] px-6 py-12">
      <Container>
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Heading as="h1" level="h1">
              Projets
            </Heading>
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
            <Button asChild size="sm">
              <Link to={routes.adminProjetNew}>
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Ajouter
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={logout.isPending}
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              {logout.isPending ? 'Déconnexion…' : 'Déconnexion'}
            </Button>
          </div>
        </header>

        {reorderProjets.isError ? (
          <ErrorAlert>
            Échec du réordonnancement : {reorderProjets.error.message}
          </ErrorAlert>
        ) : null}

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorAlert>Erreur : {error.message}</ErrorAlert>
        ) : !projets || projets.length === 0 ? (
          <EmptyState
            message="Aucun projet pour le moment."
            action={
              <Button asChild size="sm">
                <Link to={routes.adminProjetNew}>
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                  Créer le premier projet
                </Link>
              </Button>
            }
          />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={displayedProjets.map((p) => p.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedProjets.map((projet) => (
                  <SortableProjetCard key={projet.id} id={projet.id}>
                    <Card
                      padding="none"
                      elevation="sm"
                      className="flex h-full flex-col overflow-hidden"
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
                          <Heading as="h2" level="h3">
                            {projet.title}
                          </Heading>
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

                        <FeaturedToggle projet={projet} />

                        <div className="mt-auto flex items-center gap-2 border-t border-[var(--lga-footer)] pt-4">
                          <Button
                            asChild
                            variant="ghost"
                            size="xs"
                            className="flex-1"
                            title="Voir la page publique"
                          >
                            <Link
                              to={routes.projets(projet.slug)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                              Voir
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size="xs"
                            className="flex-1"
                            title="Modifier"
                          >
                            <Link to={routes.adminProjetEdit(projet.id)}>
                              <Pencil
                                className="h-3.5 w-3.5"
                                strokeWidth={1.5}
                              />
                              Modifier
                            </Link>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              setDeleteError(null);
                              setToDelete(projet);
                            }}
                            title="Supprimer"
                            className="hover:border-red-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </SortableProjetCard>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </Container>

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

          {deleteError ? <ErrorAlert>{deleteError}</ErrorAlert> : null}

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setToDelete(null)}
              disabled={deleteProjet.isPending}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={deleteProjet.isPending}
            >
              {deleteProjet.isPending ? 'Suppression…' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function FeaturedToggle({ projet }: { projet: ProjetEntity }) {
  const updateProjet = useUpdateProjet(projet.id);

  const handleChange = (next: boolean) => {
    updateProjet.mutate({ featured: next });
  };

  return (
    <label
      className="flex items-center justify-between gap-3 border-t border-[var(--lga-footer)] pt-4 text-[11px] tracking-[0.15em] text-[var(--lga-muted)] uppercase"
      style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
    >
      <span>Carousel accueil</span>
      <Switch
        size="sm"
        checked={projet.featured}
        onCheckedChange={handleChange}
        disabled={updateProjet.isPending}
      />
    </label>
  );
}
