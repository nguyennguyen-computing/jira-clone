import { inject, Injectable } from '@angular/core';
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
import { ProjectRequest, ProjectResponse } from './models/project.interface';
import { ProjectsService } from './services/project.service';
import { computed } from '@angular/core';
import { AuthStore } from '@jira-clone/auth/data-access';

interface ProjectState {
  projects: ProjectResponse[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  isLoading: false,
  error: null,
};

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ projects, currentPage, pageSize, totalItems }) => ({
    totalPages: computed(() => Math.ceil(totalItems() / pageSize())),
    hasProjects: computed(() => projects().length > 0),
    isFirstPage: computed(() => currentPage() === 1),
    isLastPage: computed(
      () => currentPage() >= Math.ceil(totalItems() / pageSize())
    ),
  })),
  withMethods(
    (
      store,
      projectsService = inject(ProjectsService),
      authStore = inject(AuthStore)
    ) => ({
      loadProjects: rxMethod<{ page: number; limit: number }>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ page, limit }) =>
            projectsService
              .getProjects(authStore.currentUser()?.id || '', page, limit)
              .pipe(
                tapResponse({
                  next: ({ projects, total }) => {
                    console.log(authStore.currentUser())
                    patchState(store, {
                      projects,
                      currentPage: page,
                      pageSize: limit,
                      totalItems: total,
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
      createProject: rxMethod<ProjectRequest>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((project) =>
            projectsService.createProject(project).pipe(
              tapResponse({
                next: (newProject) => {
                  patchState(store, {
                    projects: [...store.projects(), newProject],
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
      setPage(page: number): void {
        patchState(store, { currentPage: page });
        this.loadProjects({ page, limit: store.pageSize() });
      },
      resetError(): void {
        patchState(store, { error: null });
      },
    })
  )
);
