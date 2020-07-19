import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormUserComponent implements OnInit {
  title: string;
  group: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit(): void {
    this.title = this.data ? 'Edit' : 'New';

    this.group = new FormGroup({
      name: new FormControl(this.data?.name, Validators.required),
      email: new FormControl(this.data?.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.data?.password, Validators.required),
    });
  }
}
