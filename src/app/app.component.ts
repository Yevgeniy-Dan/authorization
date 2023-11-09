import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState, selectCurrentUser, selectIsLoggedIn } from './store';
import { logout } from './store/actions/user.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  isAdmin: boolean | undefined;
  isLoggedIn: boolean | undefined;

  private onDestroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });

    this.store
      .select(selectCurrentUser)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user) => {
        this.isAdmin = user?.isAdmin;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Logout from account
   */
  logout(): void {
    this.store.dispatch(logout());
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
