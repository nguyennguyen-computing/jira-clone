export interface LoginResponse {
  user: { id: string; email: string; name: string; avartarUrl?: string };
  token: string;
}
