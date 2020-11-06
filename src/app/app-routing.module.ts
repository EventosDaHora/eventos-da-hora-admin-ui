import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/criador-evento/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
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
