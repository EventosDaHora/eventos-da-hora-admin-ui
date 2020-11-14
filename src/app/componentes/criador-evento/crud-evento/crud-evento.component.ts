import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng';
import {EventDTO} from "../../../dominio/Event";
import {EventService} from "../../../services/event/event.service";

@Component({
  selector: 'app-crud-evento',
  templateUrl: './crud-evento.component.html',
  styleUrls: ['./crud-evento.component.scss']
})
export class CrudEventoComponent implements OnInit {

  events: EventDTO[];

  cadastrando = false;

  items: MenuItem[];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.events = new Array(this.eventService.createEmptyEvent());
    this.items = [{
      label: 'Eventos',
      items: [
        {label: 'Criar Evento', icon: 'pi pi-fw pi-plus', routerLink: 'criar-evento'},
        {label: 'Todos os eventos', icon: 'pi pi-fw pi-star-o', routerLink: 'listar-evento'},
        {label: 'Calendário de Eventos', icon: 'pi pi-fw pi-calendar', routerLink: 'calendario'},
        {separator: true},
      ]
    }];
  }
}
