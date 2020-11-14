import {Component, OnInit, ViewChild} from '@angular/core';
import {EventDTO, SectionDTO} from "../../../../dominio/Event";
import {EventService} from "../../../../services/event/event.service";
import {ConfirmationService, MessageService, Table} from "primeng";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-listagem-evento',
    templateUrl: './listagem-evento.component.html',
    styleUrls: ['./listagem-evento.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ListagemEventoComponent implements OnInit {

    apiImageURL = `${environment.apiUrl}/eventos-da-hora-image-api`;

    events: EventDTO[];

    selectedEvent: EventDTO;

    eventDialog: boolean;

    images: string[];

    @ViewChild('dt') table: Table;

    nomeEvento: string;

    constructor(private eventService: EventService) {
    }

    ngOnInit(): void {
        this.eventService.getAll().subscribe(events => {
            this.events = events
        });
    }

    getImage(event: EventDTO) {
        const image = event.images.find(img => img.imageType === 'THUMBNAIL')

        return `${this.apiImageURL}/images/${image.imageId}`;
    }

    qtdInicial(section: SectionDTO) {
        return section.tickets[0].initialQuantity
    }

    vendidos(section: SectionDTO) {
        return section.tickets[0].ticketsReserved.length;
    }

}
