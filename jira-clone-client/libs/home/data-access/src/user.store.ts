import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from '@jira-clone/auth/data-access';

interface UserState {
  users: User[]; // Define the user structure
  isLoading: boolean;
  error: string | null;
  searchName: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  searchName: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ users, searchName }) => ({
    hasUsers: computed(() => users().length > 0),
    searchedName: computed(() => searchName()),
  })),
  withMethods((store, userService = inject(UserService)) => ({
    searchUsers: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((name) =>
          userService.searchUser(name).pipe(
            tapResponse({
              next: (users) => {
                console.log('Users:', users);
                patchState(store, {
                  users,
                  isLoading: false,
                });
              },
              error: (error: string) => {
                patchState(store, { isLoading: false, error });
              },
            })
          )
        )
      )
    ),
    resetError(): void {
      patchState(store, { error: null });
    },
  }))
);
