import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  group: FormGroup;

  constructor(private readonly http: HttpClient) {
    this.group = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  registrar() {
    const usuario = this.group.value;
    console.log(usuario);
    const respuesta = this.http.post(
      'http://clase-angular.cursos-dev.com/usuario',
      usuario
    );

    respuesta.subscribe((data) => console.log(data));
  }
}
