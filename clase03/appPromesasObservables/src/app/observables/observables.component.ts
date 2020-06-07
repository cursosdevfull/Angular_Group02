import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css'],
})
export class ObservablesComponent implements OnInit {
  /* private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  } */

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    Observable.create((obs: Observer<string>) => {
      setTimeout(() => {
        obs.next('30% del video se ha descargado');
        // obs.next('Llegó el inspector de la municipalidad');
      }, 3000);

      setTimeout(() => {
        obs.next('90% del video se ha descargado');
        // obs.next('Llegó propaganda del Pardos');
      }, 6000);

      setTimeout(() => {
        obs.error('Casa incendiándose');
      }, 10000);

      setTimeout(() => {
        obs.next('Llegó el afilador de cuchillos');
      }, 12000);

      setTimeout(() => {
        obs.complete();
      }, 8000);
    }).subscribe(
      (comunicacion) => console.log(comunicacion),
      (error) => console.log(error),
      () => console.log('El video se ha descargado completamente')
    );
  }

  executeCallAPI() {
    this.http.get('https://jsonplaceholder.typicode.com/postsXXX').subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }
}
