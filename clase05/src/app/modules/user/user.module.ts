import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { InsertUserComponent } from './insert-user/insert-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [UserListComponent, InsertUserComponent, EditUserComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class UserModule {}
