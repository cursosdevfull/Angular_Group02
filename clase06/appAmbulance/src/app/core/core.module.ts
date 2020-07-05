import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
