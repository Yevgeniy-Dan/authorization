import { ActionReducerMap } from '@ngrx/store';

import * as userStore from './user';
import * as authStore from './auth';

export const userStateKey = 'user';
export const authStateKey = 'auth';

export interface IAppState {
  [userStateKey]: userStore.IUserState;
  [authStateKey]: authStore.IAuthState;
}

export const initialState: IAppState = {
  [userStateKey]: userStore.initialState,
  [authStateKey]: authStore.initialState,
};

export const appReducers: ActionReducerMap<IAppState> = {
  [userStateKey]: userStore.reducer,
  [authStateKey]: authStore.reducer,
};
