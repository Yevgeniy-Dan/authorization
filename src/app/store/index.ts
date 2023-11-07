import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from '../interfaces/assesment.interface';

export const userFeatureKey = 'user';

export interface UserState {
  userAssesments: IAssesmentResponse[];
  userAssesmentsloading: boolean;
  graphData: IAssesmentGraphResponse;
  graphDataLoading: boolean;
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
  (state: UserState) => state.userAssesmentsloading
);

export const selectUserGraphData = createSelector(
  selectUser,
  (state: UserState) => state.graphData
);

export const selectUserGraphDataLoading = createSelector(
  selectUser,
  (state: UserState) => state.graphDataLoading
);
