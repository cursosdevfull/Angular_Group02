import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  group: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.group = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.user = this.activatedRoute.snapshot.data.response.result;
    this.group.patchValue(this.user);
    /*
          {
            status: ...,
            result: ...
          }
       */

    /*     this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getOneUser(this.id).then((response: any) => {
      const user = response.result;

      this.group.patchValue(user);
    }); */
  }

  updateUser() {
    if (this.group.valid) {
      this.userService
        .updateUser(this.user._id, this.group.value)
        /*         .updateUser(this.id, this.group.value) */
        .then((response) => {
          this.router.navigate(['/user']);
        });
    }
  }

  ngOnInit(): void {}
}
