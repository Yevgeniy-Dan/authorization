import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/services/api-service.service';
import {
  loadUserAssesments,
  loadUserAssesmentsComplete,
} from '../actions/user.actions';
import { IAssesmentResponse } from 'src/app/interfaces/assesment.interface';

@Injectable()
export class UserEffects {
  loadCats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAssesments),
      mergeMap((action: any) => {
        return this.apiService.getAssesments().pipe(
          map((userAssesments: IAssesmentResponse[]) =>
            loadUserAssesmentsComplete({ userAssesments })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
