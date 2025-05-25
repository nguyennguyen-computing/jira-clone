import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { ProjectDetailStore } from '@jira-clone/project-data-access';
import { IssueCreate } from '@jira-clone/interface';
import { IssuesService } from './lib/services/issues.service';
import { ClientStore } from '@jira-clone/client-data-access';

// Define the state interface
interface ProjectState {
  issue: IssueCreate | null;
  loading: boolean;
  error: string | null;
  issueCreated: boolean;
}

// Initial state
const initialState: ProjectState = {
  issue: null,
  loading: false,
  error: null,
  issueCreated: false,
};

export const IssueStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      issuesService = inject(IssuesService),
      clientStore = inject(ClientStore)
    ) => {
      const projectDetailStore = inject(ProjectDetailStore); // Inject ProjectDetailStore

      return {
        createIssue: rxMethod<IssueCreate>(
          pipe(
            tap((id) => patchState(store, { loading: true, error: null })),
            switchMap((id) =>
              issuesService.createIssue(id).pipe(
                tapResponse({
                  next: (issue) => {
                    patchState(store, {
                      issue,
                      loading: false,
                      issueCreated: true,
                    });
                    const projectId = issue.projectId;
                    if (projectId) {
                      projectDetailStore.getIssuesByProjectId(projectId);
                    }
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
        getIssueById: rxMethod<string>(
          pipe(
            tap(() => {
              clientStore.setLoading(true);
              patchState(store, { loading: true, error: null });
            }),
            switchMap((id) => {
              patchState(store, {
                issue: null,
                loading: false,
              });
              return issuesService.getIssueById(id).pipe(
                finalize(() => {
                  clientStore.setLoading(false);
                }),
                tapResponse({
                  next: (issue) => {
                    patchState(store, {
                      issue,
                      loading: false,
                    });
                  },
                  error: (error: any) =>
                    patchState(store, {
                      error: error.message || 'Failed to fetch issue',
                      loading: false,
                    }),
                })
              );
            })
          )
        ),
        resetIssueCreated(): void {
          patchState(store, { issueCreated: false });
        },
      };
    }
  )
);
