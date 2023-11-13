import { AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserTableEntity } from 'src/app/interfaces/user.interface';
import { IAppState } from 'src/app/state/app.state';
import { loadUserData, selectUserTableData } from 'src/app/state/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'education',
    'role',
    'position',
  ];

  dataSource = new MatTableDataSource<IUserTableEntity>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userData$: Observable<IUserTableEntity[]>;
  private userDataSubscription!: Subscription;

  constructor(private store: Store<IAppState>) {
    this.userData$ = this.store
      .select(selectUserTableData)
      .pipe(map((userTableData) => userTableData.data));
  }

  ngOnInit(): void {
    this.loadUserData();
    this.userDataSubscription = this.userData$.subscribe(
      (data: IUserTableEntity[]) => {
        this.dataSource.data = data;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }

  /**
   * Load users from store
   */
  private loadUserData(): void {
    this.store.dispatch(loadUserData());
  }
}
