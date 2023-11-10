import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import * as authActions from '../actions/auth.actions';

import { UserState } from '..';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import { localStorageSync } from 'ngrx-store-localstorage';
import { IUserCredentials } from 'src/app/interfaces/user.interface';
import { UserDto } from 'src/app/dtos/user-dto';

export const initialState: UserState = {
  userAssesments: {
    data: {} as IAssesmentResponse[],
    loading: false,
  },
  graphData: {
    data: {} as IAssesmentGraphResponse,
    loading: false,
  },
  userTableData: {
    data: [],
    loading: false,
  },
  userCredentials: {} as IUserCredentials,
  user: {} as UserDto,
};

const userReducer = createReducer(
  initialState,
  on(userActions.setCurrentUser, (state, { user }) => {
    return { ...state, user };
  }),
  on(authActions.logout, () => {
    return initialState;
  }),
  on(userActions.loadUserAssesments, (state) => {
    return {
      ...state,
      userAssesments: {
        ...state.userAssesments,
        loading: true,
      },
    };
  }),
  on(userActions.loadUserAssesmentsComplete, (state, { userAssesments }) => {
    return {
      ...state,
      userAssesments: {
        data: userAssesments,
        loading: false,
      },
    };
  }),
  on(userActions.loadUserAssesmentsGraph, (state) => {
    return {
      ...state,
      graphData: {
        ...state.graphData,
        loading: true,
      },
    };
  }),
  on(userActions.loadUserAssesmentsGraphComplete, (state, { graphData }) => {
    return {
      ...state,
      graphData: {
        data: graphData,
        loading: false,
      },
    };
  }),
  on(userActions.loadUserData, (state) => {
    return {
      ...state,
      userTableData: {
        ...state.userTableData,
        loading: true,
      },
    };
  }),
  on(userActions.loadUserDataComplete, (state, { users }) => {
    return {
      ...state,
      userTableData: {
        data: users,
        loading: false,
      },
    };
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
