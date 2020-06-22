import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HoverDirective } from '../../directives/hover.directive';
import { RolesAllowedDirective } from '../../directives/roles-allowed.directive';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    HoverDirective,
    RolesAllowedDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
