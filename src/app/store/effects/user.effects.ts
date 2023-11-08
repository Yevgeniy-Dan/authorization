import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { ApiService } from 'src/app/services/api-service.service';
import {
  loadUserAssesments,
  loadUserAssesmentsComplete,
  loadUserAssesmentsGraph,
  loadUserAssesmentsGraphComplete,
  loadUserData,
  loadUserDataComplete,
} from '../actions/user.actions';
import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class UserEffects {
  loadUserAssesments$ = createEffect(() =>
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

  loadGraphData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAssesmentsGraph),
      mergeMap((action: { id: number }) => {
        return this.apiService.getAssesmentGraph(action.id).pipe(
          map((graphData: IAssesmentGraphResponse) =>
            loadUserAssesmentsGraphComplete({ graphData })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap((action) => {
        return this.apiService.getUsers().pipe(
          map((users: User[]) => loadUserDataComplete({ users })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
