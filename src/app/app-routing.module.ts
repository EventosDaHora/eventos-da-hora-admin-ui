import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./infra/security/auth-guard.service";

const routes: Routes = [
  {
    path: '',  canActivate: [AuthGuard],
    loadChildren: () => import('./componentes/criador-evento/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },

  {
    path: 'conta',
    loadChildren: () => import('./componentes/conta-usuario/conta-usuario.module')
        .then(m => m.ContaUsuarioModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
