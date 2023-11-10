import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IUserLoginRequest } from 'src/app/interfaces/user.interface';
import { AppState, selectIsLoggedIn } from 'src/app/store';
import { login } from 'src/app/store/actions/user.actions';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {}

  /**
   * Handles user login form submission.
   */
  login(): void {
    const user: IUserLoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.store.dispatch(login({ user }));
  }
}
