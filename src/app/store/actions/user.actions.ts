import { createAction, props } from '@ngrx/store';
import { UserDto } from 'src/app/dtos/user-dto';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import { IUserTableEntity } from 'src/app/interfaces/user.interface';

export const setCurrentUser = createAction(
  '[User] Set Current User Entity',
  props<{ user: UserDto }>()
);

export const loadUserAssesments = createAction(
  '[Dashboard] Load User Assesments'
);

export const loadUserAssesmentsComplete = createAction(
  '[Dashboard] Load User Assesments Complete',
  props<{ userAssesments: IAssesmentResponse[] }>()
);

export const loadUserAssesmentsGraph = createAction(
  '[Dashboard Assesment] Load Graph Assesments',
  props<{ id: number }>()
);

export const loadUserAssesmentsGraphComplete = createAction(
  '[Dashboard Assesment] Load Graph Assesments Complete',
  props<{ graphData: IAssesmentGraphResponse }>()
);

export const loadUserData = createAction('[User] Load User Table Data');

export const loadUserDataComplete = createAction(
  '[User] Load User Table Data Complete',
  props<{ users: IUserTableEntity[] }>()
);
