import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap, switchMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api-service.service';

import {
  IAssesmentGraphResponse,
  IAssesmentResponse,
} from 'src/app/interfaces/assesment.interface';
import {
  IUser,
  IUserLoginRequest,
  IUserResponse,
} from 'src/app/interfaces/user.interface';
import {
  loadUserAssesments,
  loadUserAssesmentsComplete,
  loadUserAssesmentsGraph,
  loadUserAssesmentsGraphComplete,
  loadUserData,
  loadUserDataComplete,
  login,
  logout,
} from '../actions/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from 'src/app/dtos/user-dto';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class UserEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap((action: { user: IUserLoginRequest }) => {
          return this.authService.login(action.user).pipe(
            map((response: IUserResponse) => this.hanldeLoginSuccess(response)),
            catchError((error: any) =>
              of(
                this.handleError(
                  (error && error.error && error.error.error) ||
                    'Something went wrong'
                )
              )
            )
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

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
          map((users: IUser[]) => loadUserDataComplete({ users })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  /**
   * Handles displaying error messages using MatSnackBar.
   * @param message The error message to display.
   */
  private handleError(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  /**
   * Handles actions upon a successful login.
   * @param response The response received upon successful login.
   */
  private hanldeLoginSuccess(response: IUserResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);

    // const isAdmin = response.role === 'Admin';
    // const { token, role, ...user } = response;
    // const updatedUser: UserDto = { ...user, isAdmin };

    // this.store.dispatch(login({ user: updatedUser }));
    this.router.navigate(['dashboard']);
  }
}
