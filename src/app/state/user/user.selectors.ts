import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.state';

export const userFeatureKey = 'user';

export const selectUser = createFeatureSelector<IUserState>(userFeatureKey);

export const selectCurrentUser = createSelector(
  selectUser,
  (state: IUserState) => state.user
);

export const selectUserAssesments = createSelector(
  selectUser,
  (state: IUserState) => state.userAssesments
);

export const selectAssesmentGraphData = createSelector(
  selectUser,
  (state: IUserState) => state.graphData
);

export const selectUserTableData = createSelector(
  selectUser,
  (state: IUserState) => state.userTableData
);
