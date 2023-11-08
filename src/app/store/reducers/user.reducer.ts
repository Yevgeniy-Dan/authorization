import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

import { UserState } from '..';
import { IAssesmentGraphResponse } from 'src/app/interfaces/assesment.interface';

export const initialState: UserState = {
  userAssesments: [],
  userAssesmentsloading: true,
  graphData: {} as IAssesmentGraphResponse,
  graphDataLoading: true,
  userData: [],
  userDataLoading: true,
};

const userReducer = createReducer(
  initialState,
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
