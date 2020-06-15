import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUserLogged = false;

  constructor(private readonly authentication: AuthenticationService) {
    this.isUserLogged = this.authentication.isAuthenticated;

    this.authentication.observableStatusUser.subscribe(
      (status: boolean) => (this.isUserLogged = status)
    );
  }
}
