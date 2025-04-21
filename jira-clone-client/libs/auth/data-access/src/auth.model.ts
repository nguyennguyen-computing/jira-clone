export interface AuthModel {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  avatarUrl: string;
  projectId: string;
  email: string;
  password: string;
}

export type AuthState = {
  loggedIn: boolean;
  user: RegisterResponse | null;
  loading: boolean;
};

export const initialUserValue: RegisterResponse = {
  email: '',
  name: '',
  password: '',
  id: '',
  avatarUrl: '',
  projectId: '',
};

export const authInitialState: AuthState = {
  loggedIn: false,
  user: initialUserValue,
  loading: false,
};
