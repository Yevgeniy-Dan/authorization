import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';

import { IAssesmentGraphResponse } from 'src/app/interfaces/assesment.interface';
import {
  AppState,
  selectUserGraphData,
  selectUserGraphDataLoading,
} from 'src/app/store';
import { loadUserAssesmentsGraph } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  data$: Observable<IAssesmentGraphResponse> =
    this.store.select(selectUserGraphData);
  loading$: Observable<boolean> = this.store.select(selectUserGraphDataLoading);

  barChartLegend = false;
  barCharPlugins = [];
  barChartData?: ChartConfiguration<'bar'>['data'];

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}
  ngOnInit(): void {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot;
    const assesmentId = +snapshot.params['id'];
    this.setCharts();
    this.getGraphData(assesmentId);
  }

  private getGraphData(id: number): void {
    this.store.dispatch(loadUserAssesmentsGraph({ id }));
  }

  private setCharts(): void {
    this.data$.subscribe((data) => {
      if (data && data.data) {
        this.barChartData = {
          labels: Object.keys(data.data),
          datasets: [{ data: Object.values(data.data) }],
        };
      }
    });
  }
}
