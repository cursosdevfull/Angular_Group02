import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorMessagesDirective } from './directives/error-messages.directive';
import { ErrorControlDirective } from './directives/error-control.directive';
import { RolesAllowedDirective } from './directives/roles-allowed.directive';



@NgModule({
  declarations: [ConfirmComponent, ErrorMessagesDirective, ErrorControlDirective, RolesAllowedDirective],
  imports: [
    CommonModule
  ],
  exports: [ConfirmComponent, ErrorMessagesDirective, RolesAllowedDirective]
})
export class SharedModule { }
