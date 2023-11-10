import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppState, selectUserTableData } from 'src/app/store';
import { loadUserData } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'education',
    'role',
    'position',
  ];

  dataSource = new MatTableDataSource<IUser>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userData$: Observable<IUser[]>;

  constructor(private store: Store<AppState>) {
    this.userData$ = this.store.select(selectUserTableData);
  }

  ngOnInit(): void {
    this.getUserData();
    this.userData$.subscribe((data: IUser[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Load users from store
   */
  private getUserData(): void {
    this.store.dispatch(loadUserData());
  }
}
