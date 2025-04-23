import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { computed } from '@angular/core';
import {
  authInitialState,
  AuthState,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  RegisterResponse,
} from './auth.model';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withComputed(({ loggedIn, token, user, loading, error }) => ({
    isLoggedIn: computed(() => loggedIn()),
    authToken: computed(() => token()),
    currentUser: computed(() => user()),
    isLoading: computed(() => loading()),
    errorMessage: computed(() => error()),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      restoreState() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
          patchState(store, {
            user: JSON.parse(user),
            token,
            loggedIn: true,
            loading: false,
          });
        }
      },
      register: rxMethod<RegisterData>(
        pipe(
          exhaustMap((registerData) => {
            patchState(store, {
              user: null,
              loggedIn: false,
              loading: true,
              error: null,
            });
            return authService.register(registerData).pipe(
              tapResponse({
                next: (response: RegisterResponse) => {
                  patchState(store, {
                    user: {
                      id: response.id,
                      email: response.email,
                      name: response.name,
                      avatarUrl: response.avatarUrl,
                    },

                    loading: false,
                  });

                  router.navigateByUrl('/login');
                },
                error: (err: any) => {
                  patchState(store, {
                    user: null,
                    token: null,
                    loggedIn: false,
                    loading: false,
                    error: err.message || 'Registration failed',
                  });
                },
              })
            );
          })
        )
      ),
      login: rxMethod<LoginCredentials>(
        pipe(
          exhaustMap((credentials) => {
            patchState(store, {
              user: null,
              loggedIn: false,
              loading: true,
              error: null,
            });
            return authService.login(credentials).pipe(
              tapResponse({
                next: (response: AuthResponse) => {
                  const { user, token } = response.token;
                  patchState(store, {
                    user: response.token.user,
                    token: response.token.token,
                    loggedIn: true,
                    loading: false,
                  });
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('token', token);
                  router.navigateByUrl('/home');
                },
                error: (err: any) => {
                  patchState(store, {
                    user: null,
                    token: null,
                    loggedIn: false,
                    loading: false,
                    error: err.message || 'Login failed',
                  });
                },
              })
            );
          })
        )
      ),
      logout() {
        patchState(store, {
          user: null,
          token: null,
          loggedIn: false,
          loading: false,
          error: null,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.navigateByUrl('/login');
      },
    })
  )
);
