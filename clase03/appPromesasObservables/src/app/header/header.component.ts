import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  ngOnInit(): void {}

  logout() {
    this.autenticacionService.logout();
  }
}
