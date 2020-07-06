import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntEspanol } from './utils/paginator';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntEspanol }],
  bootstrap: [AppComponent],
})
export class AppModule {}
