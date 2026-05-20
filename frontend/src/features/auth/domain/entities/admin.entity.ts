export interface AdminEntity {
  id: string;
  identifiant: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  identifiant: string;
}
