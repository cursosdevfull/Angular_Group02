import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, LoginComponent, ErrorComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
