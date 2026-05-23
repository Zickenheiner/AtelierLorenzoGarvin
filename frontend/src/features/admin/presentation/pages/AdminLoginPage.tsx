import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLogin } from '../../domain/hooks/auth.hook';
import { cn } from '@/core/utils/cn';
import routes from '@/core/constants/routes';
import { getAccessToken } from '@/core/local/storage';

const schema = z.object({
  identifiant: z.string().min(1, 'Champ requis'),
  password: z.string().min(8, 'Au moins 8 caractères'),
});

type FormValues = z.infer<typeof schema>;

const INPUT_BASE =
  'w-full border-0 border-b border-[#c6c6c6] bg-transparent py-3 text-[16px] tracking-[0.05em] text-[var(--lga-ink)] placeholder:text-[var(--lga-muted)] focus:border-[var(--lga-ink)] focus:outline-none transition-colors';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  useEffect(() => {
    if (getAccessToken()) navigate(routes.admin, { replace: true });
  }, [navigate]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login.mutateAsync(values);
      navigate(routes.admin, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError('root', { message });
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--lga-surface)] px-6 py-12">
      <div className="w-full max-w-[420px]">
        <header className="mb-10 flex flex-col items-center gap-4">
          <img
            src="https://www.lorenzogarvin.eu/assets/lgalogo100x100.png"
            alt="LGA"
            className="h-[60px] w-[60px] object-contain"
          />
          <h1
            className="text-center text-[24px] leading-[32px] tracking-[-0.02em] text-[var(--lga-ink)]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Espace administrateur
          </h1>
          <p
            className="text-center text-[14px] tracking-[0.05em] text-[var(--lga-muted)]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            Connexion réservée à l&rsquo;administrateur.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-sm bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="identifiant"
                className="mb-1 text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                Identifiant
              </label>
              <input
                id="identifiant"
                type="text"
                autoComplete="username"
                placeholder="votre identifiant"
                aria-invalid={errors.identifiant ? 'true' : 'false'}
                {...register('identifiant')}
                className={cn(
                  INPUT_BASE,
                  errors.identifiant && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
              {errors.identifiant ? (
                <span className="mt-1 text-[12px] text-red-500">
                  {errors.identifiant.message}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-[11px] tracking-[0.2em] text-[var(--lga-muted)] uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password')}
                className={cn(
                  INPUT_BASE,
                  errors.password && 'border-red-400 focus:border-red-500',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              />
              {errors.password ? (
                <span className="mt-1 text-[12px] text-red-500">
                  {errors.password.message}
                </span>
              ) : null}
            </div>

            {errors.root ? (
              <div
                role="alert"
                className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600"
              >
                {errors.root.message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || login.isPending}
              className="mt-2 inline-flex h-[44px] w-full items-center justify-center bg-black px-6 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700 }}
            >
              {isSubmitting || login.isPending ? 'Connexion…' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
