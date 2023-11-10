import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from '../interfaces/assesment.interface';
import { IUser, IUserLoginRequest } from '../interfaces/user.interface';
import { UserDto } from '../dtos/user-dto';

export const userFeatureKey = 'user';

export interface UserState {
  userAssesments: IAssesmentResponse[];
  userAssesmentsloading: boolean;
  graphData: IAssesmentGraphResponse;
  graphDataLoading: boolean;
  userData: IUser[];
  userDataLoading: boolean;
  user: IUserLoginRequest;
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

export const selectUserTableData = createSelector(
  selectUser,
  (state: UserState) => state.userData
);

export const selectUserTableDataLoading = createSelector(
  selectUser,
  (state: UserState) => state.userDataLoading
);
