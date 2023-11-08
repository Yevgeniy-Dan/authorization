import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { Observable, Subscription } from 'rxjs';

import { IAssesmentGraphResponse } from 'src/app/interfaces/assesment.interface';
import {
  AppState,
  selectUserGraphData,
  selectUserGraphDataLoading,
} from 'src/app/store';
import { loadUserAssesmentsGraph } from 'src/app/store/actions/user.actions';

/**
 * GraphComponent: Manages the display of user assessment graphs.
 * - Retrieves and displays assessment data using Chart.js.
 */
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  data$: Observable<IAssesmentGraphResponse>;
  loading$: Observable<boolean>;

  barChartLegend = false;
  barCharPlugins = [];
  barChartData?: ChartConfiguration<'bar'>['data'];

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  private dataSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.data$ = this.store.select(selectUserGraphData);
    this.loading$ = this.store.select(selectUserGraphDataLoading);
  }

  ngOnInit(): void {
    this.initializeGraphData();
  }

  private initializeGraphData(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const assesmentId = +snapshot.params['id'];
    this.setCharts();
    this.getGraphData(assesmentId);
  }

  /**
   * Retrieves assessment graph data from the store.
   * @param id The assessment ID to fetch data for.
   */
  private getGraphData(id: number): void {
    this.store.dispatch(loadUserAssesmentsGraph({ id }));
  }

  /**
   * Sets the chart data using retrieved assessment data.
   */
  private setCharts(): void {
    this.dataSubscription = this.data$.subscribe((data) => {
      if (data && data.data) {
        this.barChartData = {
          labels: Object.keys(data.data),
          datasets: [{ data: Object.values(data.data) }],
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
