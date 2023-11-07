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
    private router: Router
  ) {}

  login(): void {
    const user: UserLoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.apiService
      .login(user)
      .pipe(
        catchError((error: any) => {
          this._snackBar.open(
            error && error.error && error.error.error,
            'Close',
            {
              duration: 5000,
            }
          );
          throw new Error(error && error.error && error.error.error);
        })
      )
      .subscribe((response: UserResponse) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
      });
  }

  openSnackBar(): void {}
}
