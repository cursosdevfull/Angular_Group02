import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../models/medic';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormMedicComponent } from '../components/form-medic/form-medic.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-list-medics',
  templateUrl: './list-medics.component.html',
  styleUrls: ['./list-medics.component.css'],
})
export class ListMedicsComponent implements OnInit, AfterViewInit {
  private onAction = new Subject();

  listMedics: Medic[] = [];
  columsToDisplay = ['_id', 'name', 'cmp', 'actions'];
  totalRecords = 0;
  columnToSort = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly medicService: MedicService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /*     this.getListMedics(0, ''); */
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange, this.onAction)
      .pipe(
        startWith(''),
        switchMap(() => {
          const pageIndex = this.paginator.pageIndex;
          const active = this.sort.active;
          const direction = this.sort.direction;

          return this.medicService.listByPage(pageIndex, active, direction);
        })
      )
      .subscribe((data: any) => {
        this.listMedics = data.results;
        this.totalRecords = data.totalRecords;
      });
    /*     this.sort.sortChange.subscribe((data: any) => {
      this.getListMedics(this.paginator.pageIndex, data.active);
    });

    this.paginator.page.subscribe((data) => {
      this.getListMedics(data.pageIndex, this.sort.active);
    }); */
  }

  edit(medic: Medic): void {
    this.openForm('edit', medic);
  }

  delete(medic: Medic): void {
    const reference: MatDialogRef<ConfirmComponent> = this.dialog.open(
      ConfirmComponent,
      {
        disableClose: true,
        width: '320px',
      }
    );

    reference.afterClosed().subscribe((response) => {
      if (response) {
        this.medicService.delete(medic._id).subscribe(() => {
          this.onAction.next();
          this.snackbar.open('Medic deleted', null, {
            duration: 2000,
          });
        });
      }
    });
  }

  openForm(action: string, medic = {}): void {
    const reference: MatDialogRef<FormMedicComponent> = this.dialog.open(
      FormMedicComponent,
      {
        panelClass: 'container-panel',
        disableClose: true,
        data: {
          action,
          medic,
        },
      }
    );

    reference.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.action === 'new') {
          this.medicService.insert(result.data).subscribe(() => {
            this.onAction.next();
            this.snackbar.open('Medic inserted', null, { duration: 2000 });
          });
        } else {
          this.medicService
            .update(result.data._id, result.data)
            .subscribe(() => {
              this.onAction.next();
              this.snackbar.open('Medic updated', null, {
                duration: 2000,
              });
            });
        }
      }
    });
  }

  /*   getListMedics(page, columnToSort): void {
    this.medicService.listByPage(page, columnToSort).subscribe((data: any) => {
      this.listMedics = data.results;
      this.totalRecords = data.totalRecords;
    });
  } */
}
