import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDiagnosticComponent } from './components/list-diagnostic/list-diagnostic.component';

const routes: Routes = [{ path: '', component: ListDiagnosticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticRoutingModule {}
