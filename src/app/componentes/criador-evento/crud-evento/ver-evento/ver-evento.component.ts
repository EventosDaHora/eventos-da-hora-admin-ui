import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {EventService} from "../../../../services/event/event.service";
import {EventDTO, SectionDTO} from "../../../../dominio/Event";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.scss']
})
export class VerEventoComponent implements OnInit {

  event: EventDTO;
  data: string;
  hora: string;
  country: string;
  city: string;
  apiImageURL = `${environment.apiUrl}/eventos-da-hora-image-api`;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private eventService: EventService) { }

  ngOnInit(): void {
      const eventId = this.config.data.event.id;
      this.eventService.getById(eventId).subscribe(event => {
        this.event = event;
        this.data = this.event.date.split('T')[0];
        this.hora = this.event.date.split('T')[1];
        this.country = event.localization.country.description;
        this.city = event.localization.city.description;
      });

  }

  getImage(event: EventDTO) {
    const image = event.images.find(img => img.imageType === 'BANNER')

    return `${this.apiImageURL}/images/${image.imageId}`;
  }

  qtdVendidos(section: SectionDTO) {
    return section.tickets[0].ticketsReserved.length;
  }

  qtdInicial(section: SectionDTO) {
    return section.tickets[0].initialQuantity;
  }

}
