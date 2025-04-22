export interface LoginResponse {
  user: { id: string; email: string; name: string };
  token: string;
}
