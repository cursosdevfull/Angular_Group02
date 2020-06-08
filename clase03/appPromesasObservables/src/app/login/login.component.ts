import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group: FormGroup;

  constructor(private readonly autenticacionService: AutenticacionService) {
    this.group = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  login() {
    const dataUser = this.group.value;
    this.autenticacionService.login(dataUser)
  }
}
