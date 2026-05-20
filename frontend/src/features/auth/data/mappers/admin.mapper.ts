import type {
  AdminEntity,
  AuthSession,
} from '../../domain/entities/admin.entity';
import type { AuthTokensResponseDto, MeResponseDto } from '../dtos/auth.dto';

export class AdminMapper {
  static toSession(dto: AuthTokensResponseDto): AuthSession {
    return {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      identifiant: dto.identifiant,
    };
  }

  static toEntity(dto: MeResponseDto): AdminEntity {
    return { id: dto.id, identifiant: dto.identifiant };
  }
}
