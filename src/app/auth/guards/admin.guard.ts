import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  const role: string | null = localStorage.getItem('role');

  const router: Router = inject(Router);
  return (!!token && role === 'Admin') || router.createUrlTree(['/login']);
};
