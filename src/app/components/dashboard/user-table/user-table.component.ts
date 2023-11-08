import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AppState, selectUserData } from 'src/app/store';
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

  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userData$: Observable<User[]>;

  constructor(private store: Store<AppState>) {
    this.userData$ = this.store.select(selectUserData);
  }

  ngOnInit(): void {
    this.getUserData();
    this.userData$.subscribe((data: User[]) => {
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
