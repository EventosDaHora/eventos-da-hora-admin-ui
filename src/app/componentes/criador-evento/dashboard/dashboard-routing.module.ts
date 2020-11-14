import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {AuthGuard} from "../../../infra/security/auth-guard.service";

const routes: Routes = [
  { path: '',  canActivate: [AuthGuard], component: DashboardComponent, children: [
      { path: 'home', component: DashboardHomeComponent },
      {
        path: 'gerenciar-evento',
        loadChildren: () => import('../crud-evento/crud-evento.module').then(m => m.CrudEventoModule)
      }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
