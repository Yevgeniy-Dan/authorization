import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from '../interfaces/assesment.interface';
import {
  IUserTableEntity,
  IUserCredentials,
} from '../interfaces/user.interface';
import { UserDto } from '../dtos/user-dto';

export const userFeatureKey = 'user';

export interface UserState {
  userAssesments: {
    data: IAssesmentResponse[];
    loading: boolean;
  };
  graphData: {
    data: IAssesmentGraphResponse;
    loading: boolean;
  };
  userTableData: {
    data: IUserTableEntity[];
    loading: boolean;
  };
  userCredentials: IUserCredentials;
  user: UserDto;
}

export interface AppState {
  user: UserState;
}

export const selectUser = createFeatureSelector<UserState>(userFeatureKey);

export const selectCurrentUser = createSelector(
  selectUser,
  (state: UserState) => state.user
);

export const selectUserAssesments = createSelector(
  selectUser,
  (state: UserState) => state.userAssesments
);

export const selectAssesmentGraphData = createSelector(
  selectUser,
  (state: UserState) => state.graphData
);

export const selectUserTableData = createSelector(
  selectUser,
  (state: UserState) => state.userTableData
);
