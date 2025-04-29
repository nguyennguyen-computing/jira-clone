import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'project/:id',
        loadComponent: () =>
          import('@jira-clone/project').then(
            (m) => m.ProjectComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@jira-clone/home').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
