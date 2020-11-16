import {Component, OnDestroy, OnInit} from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import {CalendarOptions, EventApi, EventClickArg, EventInput} from '@fullcalendar/angular';
import {EventService} from "../../../../services/event/event.service";
import {EventDTO} from "../../../../dominio/Event";
import {map} from "rxjs/operators";
import {DatesSetArg} from "@fullcalendar/common";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng";
import {VerEventoComponent} from "../../crud-evento/ver-evento/ver-evento.component";

@Component({
    selector: 'app-calendario-eventos',
    templateUrl: './calendario-eventos.component.html',
    styleUrls: ['./calendario-eventos.component.scss'],
    providers: [DialogService]
})
export class CalendarioEventosComponent implements OnInit, OnDestroy {

    constructor(private eventService: EventService,
                private router: Router,
                private dialogService: DialogService) {
    }

    currentEvents: EventApi[] = [];

    eventsInput: EventInput[];

    events: EventDTO[];

    ref: DynamicDialogRef;

    options: CalendarOptions = {
        datesSet: this.buscaEventos.bind(this),
        dateClick: this.handleDateClick.bind(this),
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
        if (dateClickArg.date.getTime() < new Date().getTime()) {
            return;
        }
        const date = dateClickArg.date.toLocaleDateString().split('T')[0];
        const confirmou = confirm(`Confirma inserção do evento em ${date}?`);
        if (confirmou) {
            this.router.navigate(['/crud', 'criar-evento'],
                {
                    queryParams: {
                        date
                    }
                });
        }
    }

    handleEventClick(clickInfo: EventClickArg) {
        const calendarApi = clickInfo.view.calendar;
        const event = calendarApi.getEventById(clickInfo.event.id);
        this.ref = this.dialogService.open(VerEventoComponent, {
            header: `${event.title}`,
            width: '70%',
            baseZIndex: 10000,
            data: { event }
        });
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents = events;
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

}
