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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';
import { HttpEventType } from '@angular/common/http';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

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
  advancedUploadImage = 0;

  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  columnsToDisplay = ['name', 'email', 'photo', 'roles', 'actions'];

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

    const reference: MatDialogRef<FormUserComponent> = this.dialog.open(
      FormUserComponent,
      {
        panelClass: 'container-form',
        disableClose: true,
        data,
      }
    );

    reference.afterClosed().subscribe((returnedValue: User) => {
      if (!returnedValue) {
        return false;
      }

      if (returnedValue._id) {
        const _id = returnedValue._id;

        const dataForm = this.formatDataUpdate(returnedValue);

        this.userService.update(_id, dataForm).subscribe((evt) => {
          if (evt.type === HttpEventType.UploadProgress) {
            const bytesLoaded = evt.loaded;
            const bytesTotal = evt.total;

            this.advancedUploadImage = Math.round(
              (bytesLoaded / bytesTotal) * 100
            );
          } else if (evt.type === HttpEventType.Response) {
            this.advancedUploadImage = 0;
            this.list();
          }
        });

        /*         this.userService.update(_id, dataForm).subscribe(() => {
          this.list();
        }); */
      } else {
        const dataForm = this.formatDataInsert(returnedValue);
        this.userService.insert(dataForm).subscribe(() => {
          this.list();
        });
      }
    });
  }

  formatDataUpdate(objJSON: User): FormData {
    if (!objJSON.password || objJSON.password.trim() !== '') {
      delete objJSON.password;
    }
    if (!objJSON.photo) {
      delete objJSON.photo;
    }
    delete objJSON.email;
    delete objJSON._id;

    const fd = new FormData();
    for (const prop in objJSON) {
      if (prop) {
        fd.append(prop, objJSON[prop]);
      }
    }

    return fd;
  }

  formatDataInsert(objJSON: User): FormData {
    if (!objJSON.photo) {
      delete objJSON.photo;
    }
    delete objJSON._id;

    const fd = new FormData();
    for (const prop in objJSON) {
      if (prop) {
        fd.append(prop, objJSON[prop]);
      }
    }

    return fd;
  }

  getUrlPhoto(row: User): string {
    return this.userService.getUrlPhoto(row.photo);
  }

  delete(row: User): void {
    const reference: MatDialogRef<ConfirmComponent> = this.dialog.open(
      ConfirmComponent,
      {
        width: '320px',
      }
    );

    reference.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      this.userService.delete(row._id).subscribe(() => {
        this.list();
      });
    });
  }
}
