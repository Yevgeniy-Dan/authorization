import { createAction, props } from '@ngrx/store';

import { IUserCredentials } from 'src/app/interfaces/user.interface';
import { IAuthState } from './auth.state';

export const login = createAction(
  '[Auth] Login',
  props<{ user: IUserCredentials }>()
);

export const setAuthOptions = createAction(
  '[Auth] Set Options',
  props<{ authOpts: IAuthState }>()
);

export const logout = createAction('[Auth] Logout');
