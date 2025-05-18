import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { computed, inject, Signal } from '@angular/core';
import { User } from '@jira-clone/interface';

export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolve: boolean;
}

export const FilterStore = signalStore(
  { providedIn: 'root' },
  withState<FilterState>({
    searchTerm: '',
    userIds: [],
    onlyMyIssue: false,
    ignoreResolve: false,
  }),
  withComputed((store) => ({
    hasActiveFilters: computed(() =>
      store.searchTerm().trim().length > 0 ||
      store.userIds().length > 0 ||
      store.onlyMyIssue() ||
      store.ignoreResolve()
    )
  })),
  withMethods((store) => {
    return {
      updateSearchTerm(searchTerm: string): void {
        patchState(store, { searchTerm });
      },
      toggleUserId(userId: string): void {
        const userIds = store.userIds();
        const updatedUserIds = userIds.includes(userId)
          ? userIds.filter((id) => id !== userId)
          : [...userIds, userId];
        patchState(store, { userIds: updatedUserIds });
      },
      toggleOnlyMyIssue(): void {
        patchState(store, { onlyMyIssue: !store.onlyMyIssue() });
      },
      toggleIgnoreResolve(): void {
        patchState(store, { ignoreResolve: !store.ignoreResolve() });
      },
      resetAll(): void {
        patchState(store, {
          searchTerm: '',
          userIds: [],
          onlyMyIssue: false,
          ignoreResolve: false,
        });
      },
      isUserSelected(user: User): Signal<boolean> {
        return computed(() => store.userIds().includes(user._id));
      },
    };
  })
);
