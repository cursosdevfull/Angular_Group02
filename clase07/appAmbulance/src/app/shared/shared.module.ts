import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorFormDirective } from './directives/error-form.directive';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ErrorFormDirective, ErrorMessageDirective, ConfirmComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ErrorFormDirective, ErrorMessageDirective, ConfirmComponent],
})
export class SharedModule {}
