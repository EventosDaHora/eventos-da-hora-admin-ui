import {Component, OnInit} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from '@fullcalendar/angular';
import {EventService} from "../../../../services/event/event.service";
import {EventDTO} from "../../../../dominio/Event";
import {map} from "rxjs/operators";
import {DatesSetArg} from "@fullcalendar/common";
import {Router} from "@angular/router";
import {Montadata} from "../../util/data/Montadata";

@Component({
    selector: 'app-calendario-eventos',
    templateUrl: './calendario-eventos.component.html',
    styleUrls: ['./calendario-eventos.component.scss']
})
export class CalendarioEventosComponent implements OnInit{

    constructor(private eventService: EventService,
                private router: Router) {
    }

    currentEvents: EventApi[] = [];

    eventsInput: EventInput[];

    events: EventDTO[];

    options: CalendarOptions = {
        datesSet: this.buscaEventos.bind(this),
        dateClick: this.handleDateClick.bind(this),
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        editable: true,
    };

    ngOnInit() {
        this.eventService.getAll().subscribe(events => {
            this.events = events;
        })
    }

    buscaEventos(arg: DatesSetArg) {
        const calendarApi = arg.view.calendar;
        this.eventService.getAll()
            .pipe(
                map(events => events as EventDTO[]),
                map(events => events.map(event => {
                    return {
                        id: event.id.toString(),
                        title: event.name,
                        start: event.date.split('T')[0]
                    }
                }))
            ).subscribe(events => {
                events.filter(event => calendarApi.getEvents().find(e => e.id === event.id) == undefined)
                      .forEach(event => calendarApi.addEvent(event))
        })
    }


    handleDateClick(dateClickArg: DateClickArg) {
        Montadata.montaDataHora(dateClickArg.date, dateClickArg.date);
        const confirmou = confirm(`Confirma inserção do evento em ${dateClickArg.date}?`);
        if (confirmou) {
            this.router.navigate(['/crud', 'criar-evento'],
                {
                    queryParams: {
                        date: dateClickArg.date
                    }
                });
        }
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: '12321',
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    }

    handleEventClick(clickInfo: EventClickArg) {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents = events;
    }

}
