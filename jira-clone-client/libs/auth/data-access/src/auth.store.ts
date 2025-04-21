import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { exhaustMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { authInitialState, AuthModel, AuthState } from './auth.model';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>(authInitialState),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      register: rxMethod<AuthModel>(
        pipe(
          exhaustMap((newUserData) => {
            patchState(store, { user: null, loggedIn: false, loading: true });
            return authService.register(newUserData).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user, loggedIn: true, loading: false });
                  router.navigateByUrl('/login');
                },
                error: ({ error }) => {
                  patchState(store, {
                    user: null,
                    loggedIn: false,
                    loading: false,
                  });
                },
              })
            );
          })
        )
      ),
      isLoading: () => store.loading(),
    })
  )
);
