import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudEventoComponent} from './crud-evento.component';
import {ListagemEventoComponent} from './listagem-evento/listagem-evento.component';
import {CriarEventoComponent} from './criar-evento/criar-evento.component';
import {CalendarioEventosComponent} from '../dashboard/calendario-eventos/calendario-eventos.component';
import {AuthGuard} from "../../../infra/security/auth-guard.service";

const rotas: Routes = [
  {
    path: 'crud',  canActivate: [AuthGuard], component: CrudEventoComponent,
    children: [
      {path: '', component: ListagemEventoComponent},
      {path: 'criar-evento', component: CriarEventoComponent},
      {path: 'listar-evento', component: ListagemEventoComponent},
      {path: 'calendario', component: CalendarioEventosComponent}
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas)
  ],
  exports: [RouterModule]
})
export class CrudEventoRoutingModule {
}
