import { AdminEntity } from '@features/auth/domains/entities/admin.entity';

export interface IAdminRepository {
  findByIdentifiant(identifiant: string): Promise<AdminEntity | null>;
  findById(id: string): Promise<AdminEntity | null>;
  create(identifiant: string, passwordHash: string): Promise<AdminEntity>;
  updatePassword(id: string, passwordHash: string): Promise<boolean>;
}
