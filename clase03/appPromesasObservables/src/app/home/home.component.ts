import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userLogged = false;

  constructor(private readonly autenticacionService: AutenticacionService) {
    this.userLogged = this.autenticacionService.isUserLogged();

    this.autenticacionService
      .changeStatus()
      .subscribe((status: boolean) => (this.userLogged = status));
  }

  ngOnInit(): void {}
}
