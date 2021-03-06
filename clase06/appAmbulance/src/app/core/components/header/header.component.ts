import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() menu;
  nameUser: string;

  constructor(private readonly auth: AuthService) {
    if (this.auth.isLogged()) {
      this.nameUser = this.auth.getDataUser('name');
    }
    this.auth.changeStatus().subscribe((status) => {
      if (status) {
        this.nameUser = this.auth.getDataUser('name');
      }
    });
  }

  ngOnInit(): void {}

  openMenuSide(): void {
    this.menu.toggle();
  }

  logout(): void {
    this.auth.logout();
  }
}
