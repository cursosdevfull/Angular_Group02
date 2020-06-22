import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  listUsers: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    console.log('Roles', this.auth.getRolesUser());
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .then((response: any) => (this.listUsers = response.results));
  }

  goToFormNewUser() {
    // this.router.navigate(['user', 'new']);
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  deleteUser(id: string) {
    if (confirm('¿Desea eliminar?')) {
      this.userService
        .deleteUser(id)
        .then((response: any) => this.getAllUsers());
    }
  }

  editUser(id: string) {
    this.router.navigate(['user', 'edit', id]);
  }
}
