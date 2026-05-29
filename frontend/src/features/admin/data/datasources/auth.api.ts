import request from '@/core/config/api';
import endpoints from '@/core/constants/endpoints';
import type {
  AuthTokensResponseDto,
  LoginRequestDto,
  MeResponseDto,
} from '../dtos/auth.dto';

export class AuthApi {
  private readonly baseUrl = endpoints.auth;

  login(data: LoginRequestDto): Promise<AuthTokensResponseDto> {
    return request<AuthTokensResponseDto>({
      url: this.baseUrl.login,
      method: 'POST',
      data,
    });
  }

  logout(): Promise<void> {
    return request<void>({
      url: this.baseUrl.logout,
      method: 'POST',
    });
  }

  me(): Promise<MeResponseDto> {
    return request<MeResponseDto>({
      url: this.baseUrl.me,
      method: 'GET',
    });
  }
}
