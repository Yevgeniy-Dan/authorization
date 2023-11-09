import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from 'src/app/services/api-service.service';
import {
  UserLoginRequest,
  UserResponse,
} from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { login } from 'src/app/store/actions/user.actions';
import { UserDto } from 'src/app/dtos/user-dto';
/**
 * LoginComponent: Manages user login functionality.
 * - It handles user login form submission.
 * - Uses the ApiService to send login requests.
 * - Handles login success and error messages with MatSnackBar.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) {}

  /**
   * Handles user login form submission.
   */
  login(): void {
    const user: UserLoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    //TODO: Ask if it's good practice don't use state here
    this.apiService
      .login(user)
      .pipe(
        catchError((error: any) => {
          const errorMessage =
            (error && error.error && error.error.error) ||
            'Something went wrong';
          this.handleError(errorMessage);
          throw new Error(errorMessage);
        })
      )
      .subscribe((response: UserResponse) => {
        this.hanldeLoginSuccess(response);
      });
  }

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
  private hanldeLoginSuccess(response: UserResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.role);

    const isAdmin = response.role === 'Admin';
    const { token, role, ...user } = response;
    const updatedUser: UserDto = { ...user, isAdmin };

    this.store.dispatch(login({ user: updatedUser }));
    this.router.navigate(['/dashboard']);
  }
}
