import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css'],
})
export class InsertUserComponent implements OnInit {
  group: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.group = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required),
    });
  }

  addUser() {
    if (this.group.valid) {
      this.userService.insertUser(this.group.value).then((response) => {
        this.router.navigate(['/user']);
      });
    }
  }

  ngOnInit(): void {}
}
