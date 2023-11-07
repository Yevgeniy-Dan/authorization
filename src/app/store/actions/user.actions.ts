import { createAction, props } from '@ngrx/store';
import { IAssesmentResponse } from 'src/app/interfaces/assesment.interface';

export const loadUserAssesments = createAction(
  '[Dashboard] Load User Assesments'
);

export const loadUserAssesmentsComplete = createAction(
  '[Dashboard] Load User Assesments Complete',
  props<{ userAssesments: IAssesmentResponse[] }>()
);
