import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicRoutingModule } from './medic-routing.module';
import { ListMedicComponent } from './components/list-medic/list-medic.component';
import { FormMedicComponent } from './components/form-medic/form-medic.component';


@NgModule({
  declarations: [ListMedicComponent, FormMedicComponent],
  imports: [
    CommonModule,
    MedicRoutingModule
  ]
})
export class MedicModule { }
