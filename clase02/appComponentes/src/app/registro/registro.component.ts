import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  group: FormGroup;
  allowedDomains = ['solgas.com.pe', 'solgas.pe'];
  interestsList = [
    'Tecnología',
    'Lectura',
    'Filantropía',
    'Voluntariado',
    'Música',
  ];

  constructor() {
    this.group = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        this.validateEmailCompany.bind(this),
      ]),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        this.validatePasswordAndConfirm,
      ]),
      hobbies: new FormArray([]),
      interests: new FormArray(
        this.interestsList.map((interest) => new FormControl()),
        this.validateMinInterest
      ),
      terms: new FormControl(null, Validators.requiredTrue),
    });
  }

  ngOnInit(): void {}

  signUp() {
    console.log(this.group);
  }

  validateEmailCompany(form: FormControl): { [s: string]: boolean } {
    /* const allowedDomains = ['solgas.com.pe', 'solgas.pe']; */

    if (form && form.value) {
      const partsEmail = form.value.split('@'); // ["sergio", "midominio.com"]

      if (partsEmail.length < 2) {
        return null;
      }

      const domainEmail = partsEmail[1].toLowerCase();

      if (this.allowedDomains.indexOf(domainEmail) === -1) {
        return { deniedDomain: true };
      }

      return null;
    }

    return null;
  }

  validatePasswordAndConfirm(ctrl: AbstractControl): { [s: string]: boolean } {
    if (!ctrl || !ctrl.parent) {
      return null;
    }

    const password = ctrl.parent.get('password');
    const passwordConfirm = ctrl.parent.get('passwordConfirm');

    if (
      password &&
      password.value &&
      passwordConfirm &&
      passwordConfirm.value
    ) {
      if (password.value !== passwordConfirm.value) {
        return { passwordConfirm: true };
      }
      return null;
    }

    return null;
  }

  validateMinInterest(ctrl: AbstractControl): { [s: string]: boolean } {
    let checksAmount = 0;

    if (!ctrl || !ctrl.parent) {
      return null;
    }

    const formArray = ctrl.parent.get('interests') as FormArray;
    if (!formArray || !formArray.controls) {
      return null;
    }

    for (const control of formArray.controls) {
      if (control.value) {
        checksAmount++;
      }
    }

    if (checksAmount < 2) {
      return { minChecks: true };
    }

    return null;
  }

  addHobbie() {
    const formArray: FormArray = this.group.get('hobbies') as FormArray;
    const formControl: FormControl = new FormControl(null, Validators.required);

    formArray.push(formControl);
  }

  deleteHobbie(index: number) {
    const formArray: FormArray = this.group.get('hobbies') as FormArray;
    formArray.removeAt(index);
  }

  loadInitialData() {
    const fullName = 'Sergio Hidalgo';
    const email = 'sergiohidalgocaceres@gmail.com';

    this.group.patchValue({ fullName, email });
  }
}
