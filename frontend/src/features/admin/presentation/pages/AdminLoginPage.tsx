import { Button } from '@/core/components/ui/button';
import { Card } from '@/core/components/ui/card';
import { ErrorAlert } from '@/core/components/ui/error-alert';
import { Field } from '@/core/components/ui/field';
import { Heading } from '@/core/components/ui/heading';
import { Input } from '@/core/components/ui/input';
import routes from '@/core/constants/routes';
import { getAccessToken } from '@/core/local/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLogin } from '../../domain/hooks/auth.hook';

const schema = z.object({
  identifiant: z.string().min(1, 'Champ requis'),
  password: z.string().min(8, 'Au moins 8 caractères'),
});

type FormValues = z.infer<typeof schema>;

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
          <Heading as="h1" level="h2" className="text-center">
            Espace administrateur
          </Heading>
          <p
            className="text-center text-[14px] tracking-[0.05em] text-[var(--lga-muted)]"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            Connexion réservée à l&rsquo;administrateur.
          </p>
        </header>

        <Card padding="md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <Field
              label="Identifiant"
              htmlFor="identifiant"
              error={errors.identifiant?.message}
            >
              <Input
                id="identifiant"
                autoComplete="username"
                placeholder="votre identifiant"
                aria-invalid={errors.identifiant ? 'true' : 'false'}
                {...register('identifiant')}
              />
            </Field>

            <Field
              label="Mot de passe"
              htmlFor="password"
              error={errors.password?.message}
            >
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password')}
              />
            </Field>

            {errors.root ? (
              <ErrorAlert>{errors.root.message}</ErrorAlert>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting || login.isPending}
              className="mt-2 w-full"
            >
              {isSubmitting || login.isPending ? 'Connexion…' : 'Se connecter'}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
