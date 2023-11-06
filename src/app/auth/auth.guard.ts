import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  return !!token;
};
