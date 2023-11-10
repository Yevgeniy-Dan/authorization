import { createAction, props } from '@ngrx/store';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import { IUser } from 'src/app/interfaces/user.interface';

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
  props<{ users: IUser[] }>()
);
