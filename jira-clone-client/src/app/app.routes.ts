import { Route } from '@angular/router';
import { LoginComponent, RegisterComponent } from '@jira-clone/auth';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadComponent() {
      return import('@jira-clone/auth').then((m) => m.RegisterComponent);
    },
  },
  {
    path: 'login',
    loadComponent() {
      return import('@jira-clone/auth').then((m) => m.LoginComponent);
    },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent() {
      return import('@jira-clone/shell').then((m) => m.ShellComponent);
    },
  },
];
