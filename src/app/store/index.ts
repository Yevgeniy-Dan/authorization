import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAssesmentResponse } from '../interfaces/assesment.interface';

export const userFeatureKey = 'user';

export interface UserState {
  userAssesments: IAssesmentResponse[];
  loading: boolean;
}

export interface AppState {
  user: UserState;
}

export const selectUser = createFeatureSelector<UserState>(userFeatureKey);

export const selectUserAssesments = createSelector(
  selectUser,
  (state: UserState) => state.userAssesments
);

export const selectUserAssesmentsLoading = createSelector(
  selectUser,
  (state: UserState) => state.loading
);
