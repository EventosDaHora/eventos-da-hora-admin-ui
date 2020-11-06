import {Component, OnInit} from '@angular/core';
import {TipoGrafico} from '../../util/dominio/enums/TipoGrafico';
import {EventDTO} from "../../../../dominio/Event";
import {EventService} from "../../../../services/event/event.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  events: EventDTO[];

  graficoLinha = TipoGrafico.LINHA;
  graficoProgresso = TipoGrafico.PROGRESSO;
  graficoDoughnut = TipoGrafico.DOUGHNUT;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events = new Array(this.eventService.createEmptyEvent());
  }

}
