import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAssesmentGraphResponse } from 'src/app/interfaces/assesment.interface';
import { IAppState } from 'src/app/state/app.state';
import {
  loadUserAssesmentsGraph,
  selectAssesmentGraphData,
} from 'src/app/state/user';

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

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
    this.data$ = this.store
      .select(selectAssesmentGraphData)
      .pipe(
        map((graph) => (graph ? graph.data : ({} as IAssesmentGraphResponse)))
      );
    this.loading$ = this.store
      .select(selectAssesmentGraphData)
      .pipe(map((graph) => graph.loading));
  }

  ngOnInit(): void {
    this.initializeGraphData();
  }

  private initializeGraphData(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const assesmentId = +snapshot.params['id'];
    this.setCharts();
    this.loadGraphData(assesmentId);
  }

  /**
   * Retrieves assessment graph data from the store.
   * @param id The assessment ID to fetch data for.
   */
  private loadGraphData(id: number): void {
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
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
