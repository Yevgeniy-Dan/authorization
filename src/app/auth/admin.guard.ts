import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  const role: string | null = localStorage.getItem('role');
  return !!token && role === 'Admin';
};
