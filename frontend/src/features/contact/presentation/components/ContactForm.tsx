import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/core/utils/cn';

const schema = z.object({
  prenom: z.string().min(1, 'Champ requis'),
  nom: z.string().min(1, 'Champ requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(1, 'Champ requis'),
  codePostal: z.string().min(1, 'Champ requis'),
  description: z.string().min(1, 'Champ requis'),
});

type FormValues = z.infer<typeof schema>;

const FIELDS: Array<{
  name: keyof FormValues;
  label: string;
  type?: string;
}> = [
  { name: 'prenom', label: 'votre prénom' },
  { name: 'nom', label: 'votre nom' },
  { name: 'email', label: 'votre adresse mail', type: 'email' },
  { name: 'telephone', label: 'votre numéro de téléphone', type: 'tel' },
  { name: 'codePostal', label: 'code postal du projet' },
];

const INPUT_BASE =
  'w-full bg-transparent border-0 border-b border-[#c6c6c6]/40 py-3 text-[18px] leading-7 tracking-[0.1em] text-[var(--lga-ink)] placeholder:text-[var(--lga-muted)] focus:border-[var(--lga-ink)] focus:outline-none transition-colors';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: FormValues) => {
    // TODO: brancher l'API contact quand le backend sera disponible
    console.log('contact form submitted', values);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-sm bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-col gap-4">
        {FIELDS.map((field) => (
          <div key={field.name} className="flex flex-col">
            <input
              id={field.name}
              type={field.type ?? 'text'}
              placeholder={field.label}
              aria-invalid={errors[field.name] ? 'true' : 'false'}
              {...register(field.name)}
              className={cn(
                INPUT_BASE,
                errors[field.name] && 'border-red-400 focus:border-red-500',
              )}
              style={{ fontFamily: 'var(--font-body)' }}
            />
            {errors[field.name] ? (
              <span className="mt-1 text-[12px] text-red-500">
                {errors[field.name]?.message}
              </span>
            ) : null}
          </div>
        ))}

        <div className="flex flex-col">
          <textarea
            id="description"
            placeholder="descriptif du projet"
            rows={4}
            aria-invalid={errors.description ? 'true' : 'false'}
            {...register('description')}
            className={cn(
              INPUT_BASE,
              'resize-none',
              errors.description && 'border-red-400 focus:border-red-500',
            )}
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {errors.description ? (
            <span className="mt-1 text-[12px] text-red-500">
              {errors.description.message}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[37px] w-fit items-center justify-center self-start bg-black px-[30px] py-[10px] text-[11px] leading-[16.5px] tracking-[0.1em] text-[var(--lga-hero-text)] uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          envoyer message
        </button>
      </div>
    </form>
  );
}
