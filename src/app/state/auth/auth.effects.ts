import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { IUserCredentials, IUser } from 'src/app/interfaces/user.interface';
import { setCurrentUser } from '../user';

import { login, logout, setAuthOptions } from './auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from 'src/app/dtos/user-dto';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IAuthState } from './auth.state';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        switchMap((action: { user: IUserCredentials }) => {
          return this.authService.login(action.user).pipe(
            map((response: IUser) => this.hanldeLoginSuccess(response)),
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppState>,
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
  private hanldeLoginSuccess(response: IUser): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);

    const { token, role, ...user } = response;

    const authOpts: IAuthState = {
      isAdmin: response.role === 'Admin',
      isAuthorized: true,
    };

    this.store.dispatch(setCurrentUser({ user }));
    this.store.dispatch(setAuthOptions({ authOpts }));

    this.router.navigate(['dashboard']);
  }
}
