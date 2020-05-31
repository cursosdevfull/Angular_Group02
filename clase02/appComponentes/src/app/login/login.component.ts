import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') formLogin;

  constructor() {}

  ngOnInit(): void {}

  showInfo() {
    console.log(this.formLogin);
  }

  loginUser() {
    console.log(this.formLogin);
  }

  /*   showInfo(f) {
    console.log(f);
  } */
}
