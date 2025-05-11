export interface LoginResponse {
  user: { id: string; email: string; name: string; avatarUrl?: string };
  token: string;
}
