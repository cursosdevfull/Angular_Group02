import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login(evt): void {
    evt.preventDefault();

    if (this.group.valid) {
      const user: User = this.group.value;
      this.auth.login(user).subscribe((response) => {
        if (response === '') {
          this.router.navigate(['/dashboard']);
        } else {
          this.snackbar.open(response, null, {
            duration: 2000,
          });
        }
      });
    }
  }
}
