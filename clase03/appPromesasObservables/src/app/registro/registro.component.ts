import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario.service';
import { MensajeService } from '../mensaje.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  group: FormGroup;

  constructor(
    private readonly http: HttpClient,
    private readonly usuarioService: UsuarioService,
    private readonly mensajeService: MensajeService
  ) {
    this.group = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  registrar() {
    const usuario = this.group.value;
    this.usuarioService.registrar();
  }
}
