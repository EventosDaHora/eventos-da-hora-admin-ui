import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ResetarSenhaComponent} from './resetar-senha/resetar-senha.component';
import {AccordionModule, ButtonModule, CardModule, InputMaskModule, SharedModule} from 'primeng';
import {NgSelectModule} from '@ng-select/ng-select';
import {CriarSenhaComponent} from "./criar-senha/criar-senha.component";
import {InfraModule} from "../../infra/infra.module";

const rotas: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'criar-senha/:id/:dsToken',
        component: CriarSenhaComponent
    },
    {
        path: 'resetar-senha',
        component: ResetarSenhaComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        ResetarSenhaComponent,
        CriarSenhaComponent
    ],
    imports: [
        InputMaskModule,
        NgSelectModule,
        ButtonModule,
        CardModule,
        CommonModule,
        FormsModule,
        InfraModule,
        RouterModule.forChild(rotas),
        AccordionModule,
        SharedModule
    ]
})
// @ts-ignore
export class ContaUsuarioModule {

}
