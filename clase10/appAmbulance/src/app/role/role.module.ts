import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { ListRoleComponent } from './components/list-role/list-role.component';
import { FormRoleComponent } from './components/form-role/form-role.component';


@NgModule({
  declarations: [ListRoleComponent, FormRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
