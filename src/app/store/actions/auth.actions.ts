import { createAction, props } from '@ngrx/store';

import { IUserCredentials } from 'src/app/interfaces/user.interface';

export const login = createAction(
  '[User] Login',
  props<{ user: IUserCredentials }>()
);

export const logout = createAction('[User] Logout');
