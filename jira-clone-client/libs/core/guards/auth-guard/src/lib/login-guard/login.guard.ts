import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@jira-clone/auth/data-access';

export const loginGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isLoggedIn = authStore.isLoggedIn();
  if (isLoggedIn) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
