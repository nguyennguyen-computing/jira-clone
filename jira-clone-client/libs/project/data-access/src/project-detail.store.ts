import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { Project } from './project.model';
import { ProjectDetailService } from './services/project-detail.service';

// Define the state interface
interface ProjectState {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
};

export const ProjectDetailStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      projectDetailService = inject(ProjectDetailService)
    ) => ({
      fetchProject: rxMethod<string>(
        pipe(
          tap((id) => patchState(store, { loading: true, error: null })),
          switchMap((id) =>
            projectDetailService.getProject(id).pipe(
              tapResponse({
                next: (project) =>{
                  patchState(store, { project, loading: false })
                  console.log('Project:', project);
                }
                  ,
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
    })
  ),
);
