import { inject, Signal } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { Project } from './project.model';
import { ProjectDetailService } from './services/project-detail.service';
import { IssueCreate, User } from '@jira-clone/interface';
import { ClientStore } from '@jira-clone/client-data-access';

interface ProjectState {
  project: Project | null;
  usersInProject: User[];
  loading: boolean;
  issues: IssueCreate[];
  error: string | null;
}

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
  withMethods(
    (
      store,
      projectDetailService = inject(ProjectDetailService),
      clientStore = inject(ClientStore)
    ) => {
      const sortIssues = (issues: IssueCreate[]): IssueCreate[] => {
        return [...issues].sort((a, b) => a.listPosition - b.listPosition);
      };
      return {
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
                      error:
                        error.message || 'Failed to fetch users in project',
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
                    issues.sort((a, b) => a.listPosition - b.listPosition);
                    patchState(store, {
                      issues: sortIssues(issues),
                      loading: false,
                    });
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
        updateIsssues: rxMethod<IssueCreate[]>(
          pipe(
            tap((id) => {
              clientStore.setLoading(true);
              patchState(store, { loading: true, error: null });
            }),
            switchMap((updatedIssues) =>
              projectDetailService.updateIssues(updatedIssues).pipe(
                tapResponse({
                  next: (issues) => {
                    clientStore.setLoading(false);
                    patchState(store, {
                      issues: sortIssues(issues),
                      loading: false,
                    });
                  },
                  error: (error: any) => {
                    clientStore.setLoading(false);
                    patchState(store, {
                      error: error.message || 'Failed to update issues',
                      loading: false,
                    });
                  },
                })
              )
            )
          )
        ),
        getIssuesByStatus(status: string): Signal<IssueCreate[]> {
          return computed(() =>
            store
              .issues()
              .filter(
                (issue) => issue.status.toLowerCase() === status.toLowerCase()
              )
          );
        },
        updateIssuesOrder(status: string, updatedIssues: IssueCreate[]): void {
          const otherIssues = store
            .issues()
            .filter((issue) => issue.status !== status);
          const newIssues = [...otherIssues, ...updatedIssues];
          patchState(store, { issues: newIssues });
        },
        updateIssuesStatus(status: string, updatedIssues: IssueCreate[]): void {
          const updatedIssuesWithStatus = updatedIssues.map((issue) => ({
            ...issue,
            status,
          }));

          const otherIssues = store
            .issues()
            .filter(
              (issue) =>
                !updatedIssues.some(
                  (updatedIssue) => updatedIssue._id === issue._id
                )
            );

          const newIssues = [...otherIssues, ...updatedIssuesWithStatus];

          this.updateIsssues(newIssues);
          patchState(store, { issues: newIssues });
        },
      };
    }
  )
);
