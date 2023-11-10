import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AppState, selectCurrentUser, selectIsLoggedIn } from './store';
import { logout } from './store/actions/user.actions';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  isAdmin$: Observable<boolean | undefined>;
  isLoggedIn$: Observable<boolean | undefined>;

  private onDestroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoggedIn$ = this.store
      .select(selectIsLoggedIn)
      .pipe(takeUntil(this.onDestroy$));

    this.isAdmin$ = this.store.select(selectCurrentUser).pipe(
      takeUntil(this.onDestroy$),
      map((user) => user?.isAdmin)
    );
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
