import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { IAuthState, initialState } from './auth.state';

import { localStorageSync } from 'ngrx-store-localstorage';

const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, { user }) => {
    return { ...state, isAuthorized: true, isAdmin: true };
  }),
  on(authActions.setAuthOptions, (state, { authOpts }) => {
    return authOpts;
  }),
  on(authActions.logout, () => {
    return initialState;
  })
);

export function reducer(state: IAuthState | undefined, action: Action) {
  return authReducer(state, action);
}
