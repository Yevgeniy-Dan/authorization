import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { IUserState, initialState } from './user.state';

const userReducer = createReducer(
  initialState,
  on(userActions.setCurrentUser, (state, { user }) => {
    return { ...state, user };
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

export function reducer(state: IUserState | undefined, action: Action) {
  return userReducer(state, action);
}
