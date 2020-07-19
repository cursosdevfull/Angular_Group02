import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticRoutingModule } from './diagnostic-routing.module';
import { ListDiagnosticComponent } from './components/list-diagnostic/list-diagnostic.component';
import { FormDiagnosticComponent } from './components/form-diagnostic/form-diagnostic.component';


@NgModule({
  declarations: [ListDiagnosticComponent, FormDiagnosticComponent],
  imports: [
    CommonModule,
    DiagnosticRoutingModule
  ]
})
export class DiagnosticModule { }
