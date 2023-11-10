import { createAction, props } from '@ngrx/store';

import { IUserLoginRequest } from 'src/app/interfaces/user.interface';

export const login = createAction(
  '[User] Login',
  props<{ user: IUserLoginRequest }>()
);

export const logout = createAction('[User] Logout');
