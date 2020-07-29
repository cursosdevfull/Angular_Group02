import { Component } from '@angular/core';
import { MenuService, Menu } from './services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'appAmbulance';
  elementsMenu: Menu[];
  statusUser = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService
  ) {
    this.elementsMenu = this.menuService.itemsMenu();

    this.statusUser = this.authService.isUserLogged();
    this.authService
      .getStatusUser()
      .subscribe((status) => (this.statusUser = status));
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
