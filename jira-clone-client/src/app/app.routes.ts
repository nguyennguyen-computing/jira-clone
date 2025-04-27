import { Route } from '@angular/router';
import { authGuard, loginGuard } from '@jira-clone/auth-guard';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadComponent() {
      return import('@jira-clone/auth').then((m) => m.RegisterComponent);
    },
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    loadComponent() {
      return import('@jira-clone/auth').then((m) => m.LoginComponent);
    },
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadChildren() {
      return import('@jira-clone/shell').then((m) => m.shellRoutes);
    },
    canActivate: [authGuard],
  },
];
