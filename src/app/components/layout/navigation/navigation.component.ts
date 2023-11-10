import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppState } from 'src/app/store';
import { logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isAdmin!: boolean;
  isAuthorized!: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isAuthorized = this.authService.isAuthorized();
  }

  /**
   * Logout from account
   */
  logout(): void {
    this.store.dispatch(logout());
  }
}
