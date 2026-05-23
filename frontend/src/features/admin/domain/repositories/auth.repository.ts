import type { AdminEntity, AuthSession } from '../entities/admin.entity';

export interface AuthRepository {
  login(identifiant: string, password: string): Promise<AuthSession>;
  logout(): Promise<void>;
  me(): Promise<AdminEntity>;
}
