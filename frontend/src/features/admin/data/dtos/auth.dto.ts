export interface LoginRequestDto {
  identifiant: string;
  password: string;
}

export interface AuthTokensResponseDto {
  accessToken: string;
  refreshToken: string;
  identifiant: string;
}

export interface MeResponseDto {
  id: string;
  identifiant: string;
}
