import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListUserComponent, FormUserComponent],
  imports: [CommonModule, UserRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
