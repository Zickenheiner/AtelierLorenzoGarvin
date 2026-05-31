import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/core/utils/cn';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

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

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

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
    setStatus('idle');

    if (!WEB3FORMS_KEY) {
      console.error(
        'VITE_WEB3FORMS_KEY est manquante : impossible d’envoyer le message.',
      );
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau message du site — ${values.prenom} ${values.nom}`,
          from_name: `${values.prenom} ${values.nom}`,
          replyto: values.email,
          Prénom: values.prenom,
          Nom: values.nom,
          Email: values.email,
          Téléphone: values.telephone,
          'Code postal du projet': values.codePostal,
          'Descriptif du projet': values.description,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Échec de l’envoi');
      }

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Envoi du formulaire de contact échoué :', error);
      setStatus('error');
    }
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
          {isSubmitting ? 'envoi…' : 'envoyer message'}
        </button>

        {status === 'success' ? (
          <p
            className="text-[14px] leading-6 text-green-600"
            style={{ fontFamily: 'var(--font-body)' }}
            role="status"
          >
            Merci, votre message a bien été envoyé. Nous vous répondrons
            rapidement.
          </p>
        ) : null}
        {status === 'error' ? (
          <p
            className="text-[14px] leading-6 text-red-500"
            style={{ fontFamily: 'var(--font-body)' }}
            role="alert"
          >
            Une erreur est survenue lors de l’envoi. Merci de réessayer ou de
            nous écrire à jj@lorenzogarvin.eu.
          </p>
        ) : null}
      </div>
    </form>
  );
}
