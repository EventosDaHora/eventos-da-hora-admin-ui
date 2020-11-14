import {Component, OnInit} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'app-calendario-eventos',
  templateUrl: './calendario-eventos.component.html',
  styleUrls: ['./calendario-eventos.component.scss']
})
export class CalendarioEventosComponent implements OnInit {

  constructor() { }

  events: any[];

  options: any;

  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2017-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true
    };
  }

}
