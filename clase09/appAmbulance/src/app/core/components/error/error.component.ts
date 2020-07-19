import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  name;
  message;
  stack;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.queryParamMap.get('name');
    this.message = this.activatedRoute.snapshot.queryParamMap.get('message');
    this.stack = this.activatedRoute.snapshot.queryParamMap.get('stack');
  }

  goToLogin(): void {
    this.authService.logout();
  }
}
