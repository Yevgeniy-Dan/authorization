import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectUserAssesments } from 'src/app/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { loadUserAssesments } from 'src/app/store/actions/user.actions';
import { IAssesmentResponse } from 'src/app/interfaces/assesment.interface';
import { Router } from '@angular/router';

/**
 * UserAssesmentCardsComponent: Manages the display of user assessment cards.
 * - Loads and displays user assessment data.
 * - Handles navigation to user assessment detail pages.
 */
@Component({
  selector: 'app-user-assesment-cards',
  templateUrl: './user-assesment-cards.component.html',
  styleUrls: ['./user-assesment-cards.component.css'],
})
export class UserAssesmentCardsComponent implements OnInit {
  breakpoint!: number;

  userAssesments$: Observable<IAssesmentResponse[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.userAssesments$ = this.store
      .select(selectUserAssesments)
      .pipe(map((assesments) => assesments.data));
    this.loading$ = this.store
      .select(selectUserAssesments)
      .pipe(map((assesments) => assesments.loading));
  }

  ngOnInit(): void {
    this.calculateBreakpoint(window.innerWidth);
    this.getUserAssesments();
  }

  private getUserAssesments(): void {
    this.store.dispatch(loadUserAssesments());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Handle window resize events to update the breakpoint
    this.calculateBreakpoint((event.target as Window).innerWidth);
  }

  /**
   * Navigate to the user assessment detail page with assesment data.
   * @param assesment The user assessment data to pass to the detail page.
   */
  navigateToAssesment(assesment: IAssesmentResponse): void {
    this.router.navigate(['/dashboard/userassesments', assesment.id], {
      state: { cardData: assesment },
    });
  }

  private calculateBreakpoint(width: number): void {
    // Determine the number of cards per row based on the screen width
    if (width <= 600) {
      this.breakpoint = 1;
    } else if (width <= 800) {
      this.breakpoint = 2;
    } else if (width <= 1200) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }
}
