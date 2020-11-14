import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {InputBuscaComponent} from './input-busca/input-busca.component';
import {RodapeComponent} from './rodape/rodape.component';
import {CalendarModule, DropdownModule, InputMaskModule, SharedModule} from 'primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextoComponent} from './input-texto/input-texto.component';
import { InputMaskComponent } from './input-mask/input-mask.component';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { SelectComponent } from './select/select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { UploadComponent } from './upload/upload.component';
import {FileUploadModule} from 'primeng/fileupload';
import {FormFieldErrorComponent} from "./form-field-error/form-field-error.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    InputBuscaComponent,
    RodapeComponent,
    InputTextoComponent,
    InputMaskComponent,
    InputCalendarComponent,
    SelectComponent,
    UploadComponent,
    FormFieldErrorComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    NgSelectModule,
    FileUploadModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    InputBuscaComponent,
    InputTextoComponent,
    InputMaskComponent,
    InputCalendarComponent,
    SelectComponent,
    RodapeComponent,
    UploadComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormFieldErrorComponent,

  ]
})
export class InfraModule {
}
