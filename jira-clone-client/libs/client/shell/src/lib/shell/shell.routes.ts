import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'board/:id',
        loadComponent: () =>
          import('@jira-clone/kanban-board').then(
            (m) => m.KanbanBoardComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@jira-clone/home').then((m) => m.HomeComponent),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
