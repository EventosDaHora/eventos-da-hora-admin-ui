import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfraModule} from './infra/infra.module';
import {SidebarModule} from 'primeng/sidebar';
import {ToastrModule} from "ngx-toastr";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DashboardRoutingModule} from "./componentes/criador-evento/dashboard/dashboard-routing.module";
import {MenubarModule} from "primeng/menubar";
import {ButtonModule, CardModule, ChartModule, InputTextModule, ProgressBarModule} from "primeng";
import {CrudEventoModule} from "./componentes/criador-evento/crud-evento/crud-evento.module";
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CrudEventoModule,
    ProgressBarModule,
    ChartModule,
    FullCalendarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InfraModule,
    SidebarModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: [environment.apiWhitelisted],
        disallowedRoutes: [`${environment.apiUrl}/login`]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
