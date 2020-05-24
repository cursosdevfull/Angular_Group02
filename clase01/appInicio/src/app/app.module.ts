import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, TodoComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
