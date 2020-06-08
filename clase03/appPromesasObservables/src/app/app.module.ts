import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ObservablesComponent } from './observables/observables.component';

import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { MensajeService } from './mensaje.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservablesComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [UsuarioService, MensajeService],
  bootstrap: [HomeComponent],
})
export class AppModule {}
