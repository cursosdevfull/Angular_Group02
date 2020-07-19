import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHistoryComponent } from './components/list-history/list-history.component';

const routes: Routes = [{ path: '', component: ListHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
