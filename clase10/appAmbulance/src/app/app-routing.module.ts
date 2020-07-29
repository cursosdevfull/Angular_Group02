import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ErrorComponent } from './core/components/error/error.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  {
    path: 'history',
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryModule),
    data: { animation: 'Component' },
  },
  {
    path: 'diagnostic',
    loadChildren: () =>
      import('./diagnostic/diagnostic.module').then((m) => m.DiagnosticModule),
    data: { animation: 'Component' },
  },
  {
    path: 'medic',
    loadChildren: () =>
      import('./medic/medic.module').then((m) => m.MedicModule),
    data: { animation: 'Component' },
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    data: { animation: 'Component' },
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
    data: { animation: 'Component' },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { animation: 'Component' },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
