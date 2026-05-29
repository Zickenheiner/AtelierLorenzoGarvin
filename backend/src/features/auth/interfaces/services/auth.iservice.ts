import {
  AuthTokensResponseDto,
  LoginDto,
} from '@features/auth/domains/dtos/login.dto';

export interface IAuthService {
  login(dto: LoginDto): Promise<AuthTokensResponseDto>;
  refresh(refreshToken: string): Promise<AuthTokensResponseDto>;
  me(adminId: string): Promise<{ id: string; identifiant: string }>;
  seedAdmin(identifiant: string, password: string): Promise<string>;
}
