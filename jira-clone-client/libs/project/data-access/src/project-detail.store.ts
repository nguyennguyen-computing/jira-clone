import { inject, Signal } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { Project } from './project.model';
import { ProjectDetailService } from './services/project-detail.service';
import { IssueCreate, User } from '@jira-clone/interface';

// Define the state interface
interface ProjectState {
  project: Project | null;
  usersInProject: User[];
  loading: boolean;
  issues: IssueCreate[];
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  project: null,
  usersInProject: [],
  loading: false,
  issues: [],
  error: null,
};

export const ProjectDetailStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, projectDetailService = inject(ProjectDetailService)) => ({
    fetchProject: rxMethod<string>(
      pipe(
        tap((id) => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          projectDetailService.getProject(id).pipe(
            tapResponse({
              next: (project) => {
                patchState(store, { project, loading: false });
              },
              error: (error: any) =>
                patchState(store, {
                  error: error.message || 'Failed to fetch project',
                  loading: false,
                }),
            })
          )
        )
      )
    ),
    getUserInProject: rxMethod<string>(
      pipe(
        tap((id) => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          projectDetailService.getUserInProject(id).pipe(
            tapResponse({
              next: (usersInProject) => {
                patchState(store, { usersInProject, loading: false });
              },
              error: (error: any) =>
                patchState(store, {
                  error: error.message || 'Failed to fetch users in project',
                  loading: false,
                }),
            })
          )
        )
      )
    ),
    getIssuesByProjectId: rxMethod<string>(
      pipe(
        tap((id) => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          projectDetailService.getIssuesByProjectId(id).pipe(
            tapResponse({
              next: (issues) => {
                patchState(store, { issues, loading: false });
              },
              error: (error: any) =>
                patchState(store, {
                  error: error.message || 'Failed to fetch issues',
                  loading: false,
                }),
            })
          )
        )
      )
    ),
    getIssuesByStatus(status: string): Signal<IssueCreate[]> {
      return computed(() => store.issues().filter((issue) => issue.status.toLowerCase() === status.toLowerCase()));
    }
  }))
);
