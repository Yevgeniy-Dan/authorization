import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  /**
   * Logout from account
   */
  logout(): void {
    this.store.dispatch(logout());
  }
}
