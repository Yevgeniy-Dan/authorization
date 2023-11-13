import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/dtos/user-dto';
import { AppState, selectCurrentUser } from 'src/app/store';
import { logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  currentUser$: Observable<UserDto> = this.store.select(selectCurrentUser);

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  isShowNavbar(): boolean {
    return !this.router.url.includes('login');
  }

  /**
   * Logout from account
   */
  logout(): void {
    this.store.dispatch(logout());
  }
}
