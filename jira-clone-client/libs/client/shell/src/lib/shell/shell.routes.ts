import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [

      {
        path: 'projects',
        loadComponent: () =>
          import('@jira-clone/project').then(
            (m) => m.ProjectComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'projects',
      },
    ],
  },
];
