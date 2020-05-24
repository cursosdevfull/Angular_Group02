import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  title = 'Course Angular';
  date = new Date();

  constructor() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
