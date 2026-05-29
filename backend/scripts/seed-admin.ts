/**
 * Script CLI pour créer (ou réinitialiser) le compte admin unique.
 *
 * Usage :
 *   npm run seed:admin
 *   (le wrapper bash scripts/seed-admin.sh demande l'identifiant et le mot de passe)
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import type { IAuthService } from '../src/features/auth/interfaces/services/auth.iservice';

function getArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : undefined;
}

async function bootstrap(): Promise<void> {
  const identifiant = getArg('identifiant');
  const password = getArg('password');

  if (!identifiant || !password) {
    console.error(
      'Usage : npm run seed:admin -- --identifiant=<id> --password=<pwd>',
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Le mot de passe doit contenir au moins 8 caractères.');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const authService = app.get<IAuthService>('IAuthService');
    const id = await authService.seedAdmin(identifiant, password);
    console.log(`✓ Admin créé : ${identifiant} (id: ${id})`);
  } catch (error) {
    const err = error as Error;
    console.error(`✗ Erreur : ${err.message}`);
    await app.close();
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap().catch((error) => {
  console.error('Erreur fatale au seed admin :', error);
  process.exit(1);
});
