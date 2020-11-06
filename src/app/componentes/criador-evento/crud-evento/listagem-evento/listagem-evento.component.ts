import {Component, Input, OnInit} from '@angular/core';
import {EventDTO} from "../../../../dominio/Event";
import {EventService} from "../../../../services/event/event.service";

@Component({
  selector: 'app-listagem-evento',
  templateUrl: './listagem-evento.component.html',
  styleUrls: ['./listagem-evento.component.scss']
})
export class ListagemEventoComponent implements OnInit {

  @Input()
  events: EventDTO[];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    if (!this.events) {
      this.eventService.getAll().subscribe(events => this.events = events)
    }
  }
}
