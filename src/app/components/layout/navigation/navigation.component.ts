import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from 'src/app/state/app.state';
import { IAuthState, logout, selectAuth } from 'src/app/state/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  authOptions$: Observable<IAuthState> = this.store.select(selectAuth);

  constructor(
    private router: Router,
    private store: Store<IAppState>,
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
