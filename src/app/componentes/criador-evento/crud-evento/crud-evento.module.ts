import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListagemEventoComponent} from './listagem-evento/listagem-evento.component';
import {TableModule} from 'primeng/table';
import {CriarEventoComponent} from './criar-evento/criar-evento.component';
import {CrudEventoComponent} from './crud-evento.component';
import {CardModule} from 'primeng/card';
import {
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    InputNumberModule,
    MenuModule,
    RadioButtonModule,
    RatingModule,
    SplitButtonModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule
} from 'primeng';
import {CrudEventoRoutingModule} from './crud-evento-routing.module';
import {InfraModule} from '../../../infra/infra.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CriarIngressoComponent} from './criar-evento/criar-ingresso/criar-ingresso.component';
import {AccordionModule} from 'primeng/accordion';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ImagemEventoComponent} from './criar-evento/imagem-evento/imagem-evento.component';
import {PanelModule} from 'primeng/panel';
import {FieldsetModule} from 'primeng/fieldset';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
    declarations: [
        ListagemEventoComponent,
        CriarEventoComponent,
        CrudEventoComponent,
        CriarIngressoComponent,
        ImagemEventoComponent
    ],
    exports: [
        ListagemEventoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CardModule,
        ButtonModule,
        MenuModule,
        CrudEventoRoutingModule,
        InfraModule,
        RadioButtonModule,
        HttpClientModule,
        AccordionModule,
        SplitButtonModule,
        ToggleButtonModule,
        DynamicDialogModule,
        PanelModule,
        CheckboxModule,
        FieldsetModule,
        CalendarModule,
        NgSelectModule,
        FileUploadModule,
        ToastModule,
        ConfirmDialogModule,
        InputNumberModule,
        ToolbarModule,
        RatingModule,
        DialogModule,

    ]
})
export class CrudEventoModule {
}
