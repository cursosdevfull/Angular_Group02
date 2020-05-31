import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isDisplay = true;

  constructor() {}

  showComponent(statusComponent: boolean) {
    this.isDisplay = statusComponent;
  }
}
