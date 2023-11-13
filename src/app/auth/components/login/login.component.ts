import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IUserCredentials } from 'src/app/interfaces/user.interface';
import { IAppState } from 'src/app/state/app.state';
import { login } from 'src/app/state/auth';
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
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {}

  /**
   * Handles user login form submission.
   */
  login(): void {
    const user: IUserCredentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.store.dispatch(login({ user }));
  }
}
