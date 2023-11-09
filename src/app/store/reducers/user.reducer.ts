import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

import { UserState } from '..';
import { IAssesmentGraphResponse } from 'src/app/interfaces/assesment.interface';
import { UserDto } from 'src/app/dtos/user-dto';
import { localStorageSync } from 'ngrx-store-localstorage';

export const initialState: UserState = {
  isLoggedIn: false,
  userAssesments: [],
  userAssesmentsloading: true,
  graphData: {} as IAssesmentGraphResponse,
  graphDataLoading: true,
  userData: [],
  userDataLoading: true,
  user: null,
};

const userReducer = createReducer(
  initialState,
  on(userActions.login, (state, action) => {
    return { ...state, isLoggedIn: true, user: action.user };
  }),
  on(userActions.logout, (state) => {
    return { ...state, isLoggedIn: false, user: null };
  }),
  on(userActions.loadUserAssesments, (state) => {
    return { ...state, userAssesmentsloading: true };
  }),
  on(userActions.loadUserAssesmentsComplete, (state, { userAssesments }) => {
    return { ...state, userAssesments, userAssesmentsloading: false };
  }),
  on(userActions.loadUserAssesmentsGraph, (state) => {
    return { ...state, graphDataLoading: true };
  }),
  on(userActions.loadUserAssesmentsGraphComplete, (state, { graphData }) => {
    return { ...state, graphDataLoading: false, graphData };
  }),
  on(userActions.loadUserData, (state) => {
    return { ...state, userDataLoading: true };
  }),
  on(userActions.loadUserDataComplete, (state, { users }) => {
    return { ...state, userDataLoading: false, userData: users };
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

const localStorageSyncConfig = {
  keys: ['user'],
  rehydrate: true,
  storage: localStorage,
  removeOnUndefined: true,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any, Action>
): ActionReducer<any, Action> {
  return localStorageSync(localStorageSyncConfig)(reducer);
}
