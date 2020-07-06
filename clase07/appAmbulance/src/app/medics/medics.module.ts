import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicsRoutingModule } from './medics-routing.module';
import { ListMedicsComponent } from './list-medics/list-medics.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntEspanol } from '../utils/paginator';
import { FormMedicComponent } from './components/form-medic/form-medic.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListMedicsComponent, FormMedicComponent],
  imports: [
    CommonModule,
    MedicsRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntEspanol }],
})
export class MedicsModule {}
