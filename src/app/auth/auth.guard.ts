import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');

  const router: Router = inject(Router);
  return !!token || router.createUrlTree(['/login']);
};
