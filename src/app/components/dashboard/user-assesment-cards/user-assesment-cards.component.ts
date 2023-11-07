import { Component, HostListener, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  selectUserAssesments,
  selectUserAssesmentsLoading,
} from 'src/app/store';
import { Observable } from 'rxjs';

import { loadUserAssesments } from 'src/app/store/actions/user.actions';
import { IAssesmentResponse } from 'src/app/interfaces/assesment.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-assesment-cards',
  templateUrl: './user-assesment-cards.component.html',
  styleUrls: ['./user-assesment-cards.component.css'],
})
export class UserAssesmentCardsComponent implements OnInit {
  breakpoint!: number;

  userAssesments$: Observable<IAssesmentResponse[]> =
    this.store.select(selectUserAssesments);
  loading$: Observable<boolean> = this.store.select(
    selectUserAssesmentsLoading
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.calculateBreakpoint(window.innerWidth);
    this.getUserAssesments();
  }

  private getUserAssesments(): void {
    this.store.dispatch(loadUserAssesments());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.calculateBreakpoint((event.target as Window).innerWidth);
  }

  navigateToAssesment(card: IAssesmentResponse): void {
    this.router.navigate(['/dashboard/userassesments', card.id], {
      state: { cardData: card },
    });
  }

  private calculateBreakpoint(width: number): void {
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
