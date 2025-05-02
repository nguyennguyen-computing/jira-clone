export interface AuthModel {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  password: string;
}

export const initialUserValue: RegisterResponse = {
  email: '',
  name: '',
  password: '',
  id: '',
  avatarUrl: '',
};

export interface AuthState {
  user: { id: string; email: string; name: string; avartarUrl?: string } | null;
  token: string | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  avartarUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avartarUrl?: string;
}
export interface AuthResponse {
  message: string;
  user: User;
  token: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
  };
}

export const authInitialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loggedIn: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};
