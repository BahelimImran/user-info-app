import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './user.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { error } from 'console';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'address'];
  userDataSource: User[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  columnFilters: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalUsers: number = 0;
  users!: User[];
  firstnameSearch: string = '';
  lastnameSearch: string = '';
  isLoading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    /*
    * Get total user-list
    */
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.users.length != 0) {
          this.users = [...response.users];
          this.totalUsers = response.total;
          this.userDataSource = [...response.users].slice(0, this.paginator.pageSize)
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
  /**
    * Apply sorting for firstName, lastName and age column.
    */
  onSortChange(sortState: Sort) {
    let dataSource: User[] = [];
    if (sortState.active === 'age') {
      if (sortState.direction === 'asc') {
        dataSource = this.users.sort((a: User, b: User) => a.age - b.age);
      } else {
        dataSource = this.users.sort((a: User, b: User) => b.age - a.age);
      }
    }

    if (sortState.active === 'firstName') {
      if (sortState.direction === 'asc') {
        dataSource = this.users.sort((a: User, b: User) => {
          let nameA = a.firstName.toLowerCase(); // Convert to lower case for case-insensitive comparison
          let nameB = b.firstName.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        dataSource = this.users.sort((a: User, b: User) => {
          let nameA = a.firstName.toLowerCase(); // Convert to lower case for case-insensitive comparison
          let nameB = b.firstName.toLowerCase();

          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      }
    }

    if (sortState.active === 'lastName') {
      if (sortState.direction === 'asc') {
        dataSource = this.users.sort((a: User, b: User) => {
          let nameA = a.lastName.toLowerCase();
          let nameB = b.lastName.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else {
        dataSource = this.users.sort((a: User, b: User) => {
          let nameA = a.lastName.toLowerCase();
          let nameB = b.lastName.toLowerCase();

          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      }
    }


    this.userDataSource = dataSource;
    this.totalUsers = this.userDataSource.length;
    this.paginator.pageIndex = 0;
    this.table.dataSource = [...this.userDataSource];
    this.pageChanged();
  }
  /**
  * Apply filter for a specific column.
  */
  applyColumnFilter(column: string, event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    let users = [...this.users];
    if (column === 'firstName') {
      this.firstnameSearch = filterValue;
    }
    if (column === 'lastName') {
      this.lastnameSearch = filterValue;
    }
    this.userDataSource = this.users.filter(user => user.firstName.toLowerCase().includes(this.firstnameSearch) && user.lastName.toLowerCase().includes(this.lastnameSearch));
    this.totalUsers = this.userDataSource.length;
    this.paginator.pageIndex = 0;
    this.pageChanged();
  }

  pageChanged(event?: any, firstname?: string, lastname?: string) {
    if (event) {
      this.userDataSource = this.users.filter(user => user.firstName.toLowerCase().includes(this.firstnameSearch) && user.lastName.toLowerCase().includes(this.lastnameSearch));
      this.totalUsers = this.userDataSource.length;
      const startIndex = (event.pageIndex) * event.pageSize;
      this.userDataSource = [...this.userDataSource].slice(startIndex, startIndex + event.pageSize);
    } else {
      if (this.userDataSource.length != 0) {
        this.userDataSource = [...this.userDataSource].slice(0, this.paginator.pageSize);
      }
    }
  }
}
