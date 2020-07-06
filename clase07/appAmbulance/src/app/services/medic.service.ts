import { Injectable } from '@angular/core';
import mockMedic from '../mocks/medics.json';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medic } from '../models/medic';

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  private listMedics: Medic[] = mockMedic;

  constructor() {}

  list(): Observable<Medic[]> {
    return of(this.listMedics).pipe(delay(500));
  }

  listByPage(
    page: number,
    columnSort: string = '',
    direction: string
  ): Observable<any> {
    const sizePage = 5;

    const listMedics = this.sortByColumn(
      this.listMedics,
      columnSort,
      direction
    );
    const totalRecords = listMedics.length;
    const listMedicsPage = listMedics.slice(
      page * sizePage,
      page * sizePage + sizePage
    );

    return of({
      totalRecords,
      results: listMedicsPage,
    }).pipe(delay(500));
  }

  insert(medic: Medic): Observable<any> {
    medic._id = '' + Date.now();
    this.listMedics.push(medic);

    return of('').pipe(delay(500));
  }

  // tslint:disable-next-line: variable-name
  update(_id: string, medic: Medic): Observable<any> {
    const medicMatched = this.listMedics.find((li) => li._id === _id);

    medicMatched.name = medic.name;
    medicMatched.cmp = medic.cmp;

    return of('').pipe(delay(500));
  }

  // tslint:disable-next-line: variable-name
  delete(_id: string): Observable<any> {
    const indexMatched = this.listMedics.findIndex((li) => li._id === _id);

    this.listMedics.splice(indexMatched, 1);

    return of('').pipe(delay(500));
  }

  sortByColumn(
    list: Array<any>,
    columnSort: string = '',
    direction: string
  ): Array<any> {
    let cloneListMedics = Object.assign([], list);

    if (columnSort) {
      cloneListMedics = cloneListMedics.sort((a, b) => {
        if (direction === 'asc') {
          return a[columnSort] > b[columnSort] ? 1 : -1;
        } else if (direction === 'desc') {
          return a[columnSort] > b[columnSort] ? -1 : 1;
        }
      });
    }

    return cloneListMedics;
  }
}
