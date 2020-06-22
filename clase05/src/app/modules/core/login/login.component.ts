import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group: FormGroup;
  areCredentialsInvalid = false;

  constructor(private readonly authentication: AuthenticationService) {
    this.group = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
    });
    this.authentication.observableInvalidCredentials.subscribe(
      (status: boolean) => (this.areCredentialsInvalid = status)
    );
  }

  login() {
    const user: User = this.group.value;
    this.authentication.login(user);
  }

  ngOnInit(): void {}
}
