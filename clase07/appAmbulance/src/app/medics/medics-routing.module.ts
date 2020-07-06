import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMedicsComponent } from './list-medics/list-medics.component';

const routes: Routes = [{ path: '', component: ListMedicsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicsRoutingModule {}
