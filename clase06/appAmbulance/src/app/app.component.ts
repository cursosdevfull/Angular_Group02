import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userLogged = false;

  constructor(private readonly authService: AuthService) {
    this.userLogged = this.authService.isLogged();

    this.authService.changeStatus().subscribe((status) => {
      this.userLogged = status;
    });
  }
}
