import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
    //   {
    //     path: 'dashboard',
    //     loadComponent: () =>
    //       import('@jira-clone/client/dashboard').then(
    //         (m) => m.DashboardComponent
    //       ),
    //   },
    //   {
    //     path: 'projects',
    //     loadComponent: () =>
    //       import('@jira-clone/client/projects').then(
    //         (m) => m.ProjectsComponent
    //       ),
    //   },
    //   {
    //     path: 'issues',
    //     loadComponent: () =>
    //       import('@jira-clone/client/issues').then((m) => m.IssuesComponent),
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //   },
    ],
  },
];
