import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { ErrorAlert } from '@/core/components/ui/error-alert';
import { Field } from '@/core/components/ui/field';
import { Heading } from '@/core/components/ui/heading';
import { Input } from '@/core/components/ui/input';
import { SectionTitle } from '@/core/components/ui/section-title';
import { Textarea } from '@/core/components/ui/textarea';
import routes from '@/core/constants/routes';
import { useCreateProjet } from '@/features/projets/domain/hooks/projet.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import ImageArrayFields from '../components/ImageArrayFields';
import ImageCropField from '../components/ImageCropField';
import {
  DRAWING_CROP_TABS,
  GALLERY_CROP_TABS,
  HERO_CROP_TABS,
} from '../components/crop-tabs';

const cropImageSchema = z.object({
  img: z.string().min(1, 'Image requise'),
  imgSource: z.string().optional(),
  alt: z.string().min(1, 'Texte alternatif requis'),
});

const heroSchema = z.object({
  img: z.string().min(1, 'Image requise'),
  imgSource: z.string().optional(),
  imgCarousel: z.string().optional(),
  imgThumbnail: z.string().optional(),
  alt: z.string().min(1, 'Texte alternatif requis'),
});

const schema = z.object({
  title: z.string().min(1, 'Titre requis'),
  resume: z.string().min(1, 'Résumé requis').max(200, '200 caractères maximum'),
  narrative: z.string().min(1, 'Narration requise'),
  hero: heroSchema,
  spec: z.array(
    z.object({
      label: z.string().min(1, 'Libellé requis'),
      value: z.string().min(1, 'Valeur requise'),
    }),
  ),
  drawings: z.array(cropImageSchema),
  gallery: z.array(cropImageSchema),
});

type FormValues = z.infer<typeof schema>;

export default function AdminProjetCreatePage() {
  const navigate = useNavigate();
  const createProjet = useCreateProjet();

  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      resume: '',
      narrative: '',
      hero: {
        img: '',
        imgSource: '',
        imgCarousel: '',
        imgThumbnail: '',
        alt: '',
      },
      spec: [],
      drawings: [],
      gallery: [],
    },
  });

  const specArray = useFieldArray({ control, name: 'spec' });
  const drawingsArray = useFieldArray({ control, name: 'drawings' });
  const galleryArray = useFieldArray({ control, name: 'gallery' });

  const onSubmit = async (values: FormValues) => {
    try {
      await createProjet.mutateAsync({
        title: values.title,
        resume: values.resume,
        narrative: values.narrative,
        hero: values.hero,
        spec: values.spec,
        drawings: values.drawings,
        gallery: values.gallery,
      });
      navigate(routes.admin, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError('root', { message });
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[var(--lga-surface)] px-6 py-12">
      <div className="mx-auto w-full max-w-[860px]">
        <header className="mb-10 flex items-end justify-between gap-4">
          <div>
            <Heading as="h1" level="h1">
              Nouveau projet
            </Heading>
            <p
              className="mt-1 text-[13px] tracking-[0.05em] text-[var(--lga-muted)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Crée une nouvelle fiche projet visible côté public.
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

        <Card padding="lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-10"
          >
            <section className="flex flex-col gap-6">
              <SectionTitle>Informations générales</SectionTitle>

              <Field
                label="Titre"
                htmlFor="title"
                error={errors.title?.message}
              >
                <Input
                  id="title"
                  placeholder="Entrer le titre du projet"
                  aria-invalid={errors.title ? 'true' : 'false'}
                  {...register('title')}
                />
              </Field>

              <Field
                label="Résumé"
                htmlFor="resume"
                error={errors.resume?.message}
                hint={`${(watch('resume') ?? '').length} / 200 caractères`}
              >
                <Textarea
                  id="resume"
                  rows={2}
                  maxLength={200}
                  placeholder="Ecrivez un résumé concis du projet (200 caractères max) qui apparaîtra sur la page d'accueil"
                  aria-invalid={errors.resume ? 'true' : 'false'}
                  {...register('resume')}
                />
              </Field>

              <Field
                label="Narration"
                htmlFor="narrative"
                error={errors.narrative?.message}
                hint="Sépare les paragraphes par une ligne vide."
              >
                <Textarea
                  id="narrative"
                  rows={8}
                  placeholder="Racontez l'histoire du projet, les défis rencontrés, les solutions apportées, etc. Cette narration apparaîtra sur la page du projet."
                  aria-invalid={errors.narrative ? 'true' : 'false'}
                  {...register('narrative')}
                />
              </Field>
            </section>

            <section className="flex flex-col gap-6">
              <SectionTitle>Image hero</SectionTitle>

              <ImageCropField
                control={control}
                name="hero"
                tabs={HERO_CROP_TABS}
                invalid={!!errors.hero?.img}
                error={errors.hero?.img?.message}
              />

              <Field
                label="Texte alternatif"
                htmlFor="hero.alt"
                error={errors.hero?.alt?.message}
              >
                <Input
                  id="hero.alt"
                  placeholder="Entrer un texte alternatif décrivant l'image hero"
                  aria-invalid={errors.hero?.alt ? 'true' : 'false'}
                  {...register('hero.alt')}
                />
              </Field>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <SectionTitle>
                  Spécifications{' '}
                  <span className="font-normal text-[var(--lga-muted)]">
                    (optionnel)
                  </span>
                </SectionTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() => specArray.append({ label: '', value: '' })}
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Ajouter une spec
                </Button>
              </div>

              {specArray.fields.length === 0 ? (
                <p className="text-[12px] text-[var(--lga-muted)] italic">
                  Aucune entrée pour le moment.
                </p>
              ) : (
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
                        <Input
                          id={`spec.${idx}.label`}
                          placeholder="Entrer le libellé de la spécification"
                          {...register(`spec.${idx}.label` as const)}
                          aria-invalid={
                            errors.spec?.[idx]?.label ? 'true' : 'false'
                          }
                        />
                      </Field>
                      <Field
                        label="Valeur"
                        htmlFor={`spec.${idx}.value`}
                        error={errors.spec?.[idx]?.value?.message}
                      >
                        <Input
                          id={`spec.${idx}.value`}
                          placeholder="Entrer la valeur de la spécification"
                          {...register(`spec.${idx}.value` as const)}
                          aria-invalid={
                            errors.spec?.[idx]?.value ? 'true' : 'false'
                          }
                        />
                      </Field>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => specArray.remove(idx)}
                        aria-label="Supprimer"
                        className="hover:border-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <SectionTitle>
                  Dessins / plans{' '}
                  <span className="font-normal text-[var(--lga-muted)]">
                    (optionnel)
                  </span>
                </SectionTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() =>
                    drawingsArray.append({ img: '', imgSource: '', alt: '' })
                  }
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Ajouter un dessin
                </Button>
              </div>

              <ImageArrayFields
                fields={drawingsArray.fields}
                onRemove={(idx) => drawingsArray.remove(idx)}
                name="drawings"
                control={control}
                register={register}
                errors={errors.drawings}
                placeholderAlt="Entrer un texte alternatif décrivant l'image de la galerie"
                tabs={DRAWING_CROP_TABS}
                emptyLabel="Aucune entrée pour le moment."
              />
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <SectionTitle>
                  Galerie{' '}
                  <span className="font-normal text-[var(--lga-muted)]">
                    (optionnel)
                  </span>
                </SectionTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() =>
                    galleryArray.append({ img: '', imgSource: '', alt: '' })
                  }
                >
                  <Plus className="h-3 w-3" strokeWidth={2} />
                  Ajouter une image
                </Button>
              </div>

              <ImageArrayFields
                fields={galleryArray.fields}
                onRemove={(idx) => galleryArray.remove(idx)}
                name="gallery"
                control={control}
                register={register}
                errors={errors.gallery}
                placeholderAlt="Entrer un texte alternatif décrivant l'image de la galerie"
                tabs={GALLERY_CROP_TABS}
                emptyLabel="Aucune entrée pour le moment."
              />
            </section>

            {errors.root ? (
              <ErrorAlert>{errors.root.message}</ErrorAlert>
            ) : null}

            <div className="flex items-center justify-end gap-4">
              <Link
                to={routes.admin}
                className="text-[12px] tracking-[0.2em] text-[var(--lga-muted)] uppercase hover:text-[var(--lga-ink)]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                Annuler
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting || createProjet.isPending}
                className="px-8"
              >
                {isSubmitting || createProjet.isPending
                  ? 'Création…'
                  : 'Créer le projet'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
