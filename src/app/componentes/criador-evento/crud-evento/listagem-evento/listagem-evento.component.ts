import {Component, OnInit, ViewChild} from '@angular/core';
import {EventDTO} from "../../../../dominio/Event";
import {EventService} from "../../../../services/event/event.service";
import {ConfirmationService, MessageService, Table} from "primeng";
import {ImageService} from "../../../../services/image/image.service";
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

    constructor(private eventService: EventService,
                private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.eventService.getAll().subscribe(events => {
            this.events = events
        });

        this.imageService.getAll().subscribe(result => this.images = result)
    }

    getImage(event: EventDTO) {
        const image = event.images.filter(img => img.imageType === 'THUMBNAIL')
            .find(img => this.images.includes(img.imageId))

        return `${this.apiImageURL}/images/${image.imageId}`;
    }


}
