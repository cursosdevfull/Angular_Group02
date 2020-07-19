import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { ListHistoryComponent } from './components/list-history/list-history.component';
import { FormHistoryComponent } from './components/form-history/form-history.component';


@NgModule({
  declarations: [ListHistoryComponent, FormHistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
