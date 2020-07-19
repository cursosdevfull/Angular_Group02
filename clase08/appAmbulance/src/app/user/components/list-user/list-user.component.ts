import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { User } from '../../../models/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptionList: Subscription;
  listUsers: User[] = [];
  totalUsers = 0;
  pageSize = 2;
  pageCurrent = 0;
  sort = 'email';
  direction = 1;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  columnsToDisplay = ['name', 'email', 'roles', 'actions'];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.list();
  }

  ngAfterViewInit(): void {
    this.matPaginator.page.subscribe((response) => {
      this.pageCurrent = response.pageIndex;
      this.list();
    });

    this.matSort.sortChange.subscribe((response) => {
      this.sort = response.active;
      this.direction = response.direction === 'asc' ? 1 : -1;
      this.list();
    });
  }

  list(): void {
    this.subscriptionList = this.userService
      .listByPage(this.pageCurrent, this.sort, this.direction)
      .pipe(pluck('result'))
      .subscribe((response: { users: User[]; totalUsers: number }) => {
        this.listUsers = response.users;
        this.totalUsers = response.totalUsers;
      });
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

  showRoles(roles): string {
    const nameRoles: Array<any> = roles.map((it) => it.name);

    return nameRoles.join(', ');
  }

  openForm(user: User = null): void {
    const data = user;

    this.dialog.open(FormUserComponent, {
      panelClass: 'container-form',
      disableClose: true,
      data,
    });
  }
}
