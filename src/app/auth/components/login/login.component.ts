import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IUserCredentials } from 'src/app/interfaces/user.interface';
import { AppState } from 'src/app/store';
import { login } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { dashboardPath } from 'src/app/constants/routes';
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

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if the user is already authenticated
    if (this.authService.isAuthorized()) {
      this.router.navigate([dashboardPath]);
    }
  }

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
