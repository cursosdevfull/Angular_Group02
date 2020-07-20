import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorMessagesDirective } from './directives/error-messages.directive';
import { ErrorControlDirective } from './directives/error-control.directive';
import { RolesAllowedDirective } from './directives/roles-allowed.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ConfirmComponent,
    ErrorMessagesDirective,
    ErrorControlDirective,
    RolesAllowedDirective,
    DragAndDropDirective,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    ConfirmComponent,
    ErrorMessagesDirective,
    RolesAllowedDirective,
    DragAndDropDirective,
  ],
})
export class SharedModule {}
