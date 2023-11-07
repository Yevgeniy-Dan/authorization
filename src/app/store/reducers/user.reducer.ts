import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

import { UserState } from '..';

export const initialState: UserState = {
  userAssesments: [],
  loading: true,
};

const userReducer = createReducer(
  initialState,
  on(userActions.loadUserAssesments, (state) => {
    return { ...state, loading: true };
  }),
  on(userActions.loadUserAssesmentsComplete, (state, { userAssesments }) => {
    return { ...state, userAssesments, loading: false };
  })
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
