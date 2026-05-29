import type {
  AdminEntity,
  AuthSession,
} from '../../domain/entities/admin.entity';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthApi } from '../datasources/auth.api';
import { AdminMapper } from '../mappers/admin.mapper';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly api = new AuthApi();

  async login(identifiant: string, password: string): Promise<AuthSession> {
    const dto = await this.api.login({ identifiant, password });
    return AdminMapper.toSession(dto);
  }

  async logout(): Promise<void> {
    await this.api.logout();
  }

  async me(): Promise<AdminEntity> {
    const dto = await this.api.me();
    return AdminMapper.toEntity(dto);
  }
}
