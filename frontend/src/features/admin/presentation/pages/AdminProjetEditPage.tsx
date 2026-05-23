import routes from '@/core/constants/routes';
import { cn } from '@/core/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import {
  useProjetById,
  useUpdateProjet,
} from '@/features/projets/domain/hooks/projet.hook';
import ImageUploadField from '../components/ImageUploadField';

const imageSchema = z.object({
  img: z.string().min(1, 'URL requise'),
  alt: z.string().min(1, 'Texte alternatif requis'),
});

const schema = z.object({
  title: z.string().min(1, 'Titre requis'),
  resume: z.string().min(1, 'Résumé requis'),
  narrative: z.string().min(1, 'Narration requise'),
  hero: imageSchema,
  spec: z
    .array(
      z.object({
        label: z.string().min(1, 'Libellé requis'),
        value: z.string().min(1, 'Valeur requise'),
      }),
    )
    .min(1, 'Au moins une spécification'),
  drawings: z.array(imageSchema),
  gallery: z.array(imageSchema),
});

type FormValues = z.infer<typeof schema>;

const INPUT_BASE =
  'w-full border-0 border-b border-[#c6c6c6] bg-transparent py-3 text-[15px] tracking-[0.02em] text-[var(--lga-ink)] placeholder:text-[var(--lga-muted)] focus:border-[var(--lga-ink)] focus:outline-none transition-colors';

const TEXTAREA_BASE =
  'w-full border border-[#c6c6c6] bg-transparent p-3 text-[15px] leading-[1.6] text-[var(--lga-ink)] placeholder:text-[var(--lga-muted)] focus:border-[var(--lga-ink)] focus:outline-none transition-colors';

const LABEL_BASE =
  'mb-1 text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase';

const LABEL_STYLE = { fontFamily: 'var(--font-body)', fontWeight: 600 };

const SECTION_TITLE =
  'text-[14px] tracking-[0.2em] text-[var(--lga-ink)] uppercase';

const SECTION_TITLE_STYLE = { fontFamily: 'var(--font-body)', fontWeight: 700 };

export default function AdminProjetEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: projet, isLoading, error: loadError } = useProjetById(id);
  const updateProjet = useUpdateProjet(id ?? '');

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      resume: '',
      narrative: '',
      hero: { img: '', alt: '' },
      spec: [{ label: '', value: '' }],
      drawings: [],
      gallery: [],
    },
  });

  const specArray = useFieldArray({ control, name: 'spec' });
  const drawingsArray = useFieldArray({ control, name: 'drawings' });
  const galleryArray = useFieldArray({ control, name: 'gallery' });

  useEffect(() => {
    if (!projet) return;
    reset({
      title: projet.title,
      resume: projet.resume,
      narrative: projet.narrative,
      hero: { img: projet.hero.img, alt: projet.hero.alt },
      spec: projet.spec.length > 0 ? projet.spec : [{ label: '', value: '' }],
      drawings: projet.drawings,
      gallery: projet.gallery,
    });
  }, [projet, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProjet.mutateAsync({
        title: values.title,
        resume: values.resume,
        narrative: values.narrative,
        hero: values.hero,
        spec: values.spec,
        drawings: values.drawings.length > 0 ? values.drawings : undefined,
        gallery: values.gallery.length > 0 ? values.gallery : undefined,
      });
      navigate(routes.admin, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError('root', { message });
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--lga-surface)] text-[var(--lga-muted)]">
        Chargement…
      </main>
    );
  }

  if (loadError || !projet) {
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-[var(--lga-surface)] px-6 text-center">
        <p className="text-[var(--lga-ink)]">
          {loadError ? `Erreur : ${loadError.message}` : 'Projet introuvable.'}
        </p>
        <Link
          to={routes.admin}
          className="text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase hover:text-[var(--lga-ink)]"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
        >
          ← Retour à la liste
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[var(--lga-surface)] px-6 py-12">
      <div className="mx-auto w-full max-w-[860px]">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h1
              className="text-[28px] leading-[36px] tracking-[-0.02em] text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
            >
              Modifier le projet
            </h1>
            <p className="mt-1 font-mono text-[12px] tracking-[0.05em] text-[var(--lga-muted)]">
              /{projet.slug}
            </p>
          </div>
          <Link
            to={routes.admin}
            className="text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase hover:text-[var(--lga-ink)]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            ← Retour
          </Link>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-10 rounded-sm bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          {/* INFOS GÉNÉRALES */}
          <section className="flex flex-col gap-6">
            <h2 className={SECTION_TITLE} style={SECTION_TITLE_STYLE}>
              Informations générales
            </h2>

            <Field label="Titre" htmlFor="title" error={errors.title?.message}>
              <input
                id="title"
                type="text"
                aria-invalid={errors.title ? 'true' : 'false'}
                {...register('title')}
                className={cn(
                  INPUT_BASE,
                  errors.title && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </Field>

            <Field
              label="Résumé"
              htmlFor="resume"
              error={errors.resume?.message}
            >
              <textarea
                id="resume"
                rows={2}
                aria-invalid={errors.resume ? 'true' : 'false'}
                {...register('resume')}
                className={cn(
                  TEXTAREA_BASE,
                  errors.resume && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </Field>

            <Field
              label="Narration"
              htmlFor="narrative"
              error={errors.narrative?.message}
              hint="Sépare les paragraphes par une ligne vide."
            >
              <textarea
                id="narrative"
                rows={8}
                aria-invalid={errors.narrative ? 'true' : 'false'}
                {...register('narrative')}
                className={cn(
                  TEXTAREA_BASE,
                  errors.narrative && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </Field>
          </section>

          {/* HERO */}
          <section className="flex flex-col gap-6">
            <h2 className={SECTION_TITLE} style={SECTION_TITLE_STYLE}>
              Image hero
            </h2>

            <Field
              label="Image"
              htmlFor="hero.img"
              error={errors.hero?.img?.message}
            >
              <Controller
                control={control}
                name="hero.img"
                render={({ field }) => (
                  <ImageUploadField
                    value={field.value}
                    onChange={field.onChange}
                    invalid={!!errors.hero?.img}
                  />
                )}
              />
            </Field>

            <Field
              label="Texte alternatif"
              htmlFor="hero.alt"
              error={errors.hero?.alt?.message}
            >
              <input
                id="hero.alt"
                type="text"
                aria-invalid={errors.hero?.alt ? 'true' : 'false'}
                {...register('hero.alt')}
                className={cn(
                  INPUT_BASE,
                  errors.hero?.alt && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </Field>
          </section>

          {/* SPECS */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className={SECTION_TITLE} style={SECTION_TITLE_STYLE}>
                Spécifications
              </h2>
              <AddButton
                onClick={() => specArray.append({ label: '', value: '' })}
                label="Ajouter une spec"
              />
            </div>

            {errors.spec?.message ? (
              <p className="text-[12px] text-red-500">{errors.spec.message}</p>
            ) : null}

            <div className="flex flex-col gap-4">
              {specArray.fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <Field
                    label="Libellé"
                    htmlFor={`spec.${idx}.label`}
                    error={errors.spec?.[idx]?.label?.message}
                  >
                    <input
                      id={`spec.${idx}.label`}
                      type="text"
                      {...register(`spec.${idx}.label` as const)}
                      className={cn(
                        INPUT_BASE,
                        errors.spec?.[idx]?.label &&
                          'border-red-400 focus:border-red-500',
                      )}
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </Field>
                  <Field
                    label="Valeur"
                    htmlFor={`spec.${idx}.value`}
                    error={errors.spec?.[idx]?.value?.message}
                  >
                    <input
                      id={`spec.${idx}.value`}
                      type="text"
                      {...register(`spec.${idx}.value` as const)}
                      className={cn(
                        INPUT_BASE,
                        errors.spec?.[idx]?.value &&
                          'border-red-400 focus:border-red-500',
                      )}
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </Field>
                  <RemoveButton
                    onClick={() => specArray.remove(idx)}
                    disabled={specArray.fields.length === 1}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* DRAWINGS */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className={SECTION_TITLE} style={SECTION_TITLE_STYLE}>
                Dessins / plans{' '}
                <span className="text-[var(--lga-muted)]">(optionnel)</span>
              </h2>
              <AddButton
                onClick={() => drawingsArray.append({ img: '', alt: '' })}
                label="Ajouter un dessin"
              />
            </div>

            <ImageArrayFields
              fields={drawingsArray.fields}
              onRemove={(idx) => drawingsArray.remove(idx)}
              name="drawings"
              control={control}
              register={register}
              errors={errors.drawings}
            />
          </section>

          {/* GALLERY */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className={SECTION_TITLE} style={SECTION_TITLE_STYLE}>
                Galerie{' '}
                <span className="text-[var(--lga-muted)]">(optionnel)</span>
              </h2>
              <AddButton
                onClick={() => galleryArray.append({ img: '', alt: '' })}
                label="Ajouter une image"
              />
            </div>

            <ImageArrayFields
              fields={galleryArray.fields}
              onRemove={(idx) => galleryArray.remove(idx)}
              name="gallery"
              control={control}
              register={register}
              errors={errors.gallery}
            />
          </section>

          {errors.root ? (
            <div
              role="alert"
              className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600"
            >
              {errors.root.message}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-4">
            <Link
              to={routes.admin}
              className="text-[12px] tracking-[0.2em] text-[var(--lga-muted)] uppercase hover:text-[var(--lga-ink)]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || updateProjet.isPending}
              className="inline-flex h-[44px] items-center justify-center bg-black px-8 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              {isSubmitting || updateProjet.isPending
                ? 'Enregistrement…'
                : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className={LABEL_BASE} style={LABEL_STYLE}>
        {label}
      </label>
      {children}
      {hint && !error ? (
        <span className="mt-1 text-[11px] text-[var(--lga-muted)]">{hint}</span>
      ) : null}
      {error ? (
        <span className="mt-1 text-[12px] text-red-500">{error}</span>
      ) : null}
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 border border-[var(--lga-ink)] px-3 py-2 text-[10px] tracking-[0.2em] text-[var(--lga-ink)] uppercase transition-opacity hover:opacity-70"
      style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
    >
      <Plus className="h-3 w-3" strokeWidth={2} />
      {label}
    </button>
  );
}

function RemoveButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Supprimer"
      className="inline-flex h-[44px] w-[44px] items-center justify-center border border-[#c6c6c6] text-[var(--lga-muted)] transition-colors hover:border-red-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#c6c6c6] disabled:hover:text-[var(--lga-muted)]"
    >
      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}

interface ImageArrayFieldsProps {
  fields: { id: string }[];
  onRemove: (idx: number) => void;
  name: 'drawings' | 'gallery';
  control: ReturnType<typeof useForm<FormValues>>['control'];
  register: ReturnType<typeof useForm<FormValues>>['register'];
  errors:
    | { img?: { message?: string }; alt?: { message?: string } }[]
    | undefined;
}

function ImageArrayFields({
  fields,
  onRemove,
  name,
  control,
  register,
  errors,
}: ImageArrayFieldsProps) {
  if (fields.length === 0) {
    return (
      <p className="text-[12px] text-[var(--lga-muted)] italic">
        Aucune entrée.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-3 sm:grid-cols-[280px_1fr_auto] sm:items-end"
        >
          <Field
            label="Image"
            htmlFor={`${name}.${idx}.img`}
            error={errors?.[idx]?.img?.message}
          >
            <Controller
              control={control}
              name={`${name}.${idx}.img` as const}
              render={({ field: ctl }) => (
                <ImageUploadField
                  value={ctl.value}
                  onChange={ctl.onChange}
                  invalid={!!errors?.[idx]?.img}
                />
              )}
            />
          </Field>
          <Field
            label="Texte alternatif"
            htmlFor={`${name}.${idx}.alt`}
            error={errors?.[idx]?.alt?.message}
          >
            <input
              id={`${name}.${idx}.alt`}
              type="text"
              {...register(`${name}.${idx}.alt` as const)}
              className={cn(
                INPUT_BASE,
                errors?.[idx]?.alt && 'border-red-400 focus:border-red-500',
              )}
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </Field>
          <RemoveButton onClick={() => onRemove(idx)} />
        </div>
      ))}
    </div>
  );
}
