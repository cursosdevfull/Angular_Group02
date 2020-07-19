import { Component, OnInit, Input } from '@angular/core';
import { MenuService, Menu } from '../../../services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() menu;
  elementsMenu: Menu[];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService
  ) {
    this.elementsMenu = this.menuService.itemsMenu();
  }

  ngOnInit(): void {}

  openMenuSide(): void {
    this.menu.open();
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
  }
}
