import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { CovidService } from '../../../services/covid.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // view: number[] = [500, 500];

  colorScheme = {
    domain: ['#0d47a1', '#42a5f5', '#90caf9'],
  };

  /* dataSource = [
    { name: 'Nurse 1', value: 50 },
    { name: 'Nurse 2', value: 40 },
    { name: 'Nurse 3', value: 25 },
    { name: 'Nurse 4', value: 34 },
  ]; */
  dataSource = [];

  showLegend = false;
  showLabels = true;
  showDoughnut = true;

  showXAxis = true;
  showYAxis = true;

  xAxisLabel = 'Nurses';
  yAxisLabel = 'Emergencies';
  showXAxisLabel = true;
  showYAxisLabel = true;

  ctrlSearch: FormControl;

  choiceFiltered: Observable<string[]>;

  constructor(
    private socketService: SocketService,
    private covidService: CovidService
  ) {}

  ngOnInit(): void {
    this.ctrlSearch = new FormControl();

    this.socketService.listen('dataupdate').subscribe((results) => {
      this.dataSource = results.map((el, index) => {
        return { name: `Nurse ${index + 1}`, value: el };
      });
    });

    this.choiceFiltered = this.ctrlSearch.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) => this.filterByCountry(value))
    );
  }

  filterByCountry(countryToSearch: string): Observable<any> {
    return this.covidService.getCountries().pipe(
      map((regs: any[]) => {
        const objCountries = regs.reduce((acum, value) => {
          if (
            !acum[value.countryRegion] &&
            value.countryRegion
              .toLowerCase()
              .includes(countryToSearch.toLowerCase())
          ) {
            acum[value.countryRegion] = 1;
          }

          return acum;
        }, {});

        const countries: string[] = [];
        for (const propertyName in objCountries) {
          if (propertyName) {
            countries.push(propertyName);
          }
        }

        countries.sort((a, b) => (a > b ? 1 : -1));

        return countries;
      })
    );
  }
}
