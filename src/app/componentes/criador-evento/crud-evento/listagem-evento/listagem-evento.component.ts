import {Component, OnInit, ViewChild} from '@angular/core';
import {EventDTO, ImageEventDTO} from "../../../../dominio/Event";
import {EventService} from "../../../../services/event/event.service";
import {ConfirmationService, MessageService, Table} from "primeng";
import {ImageService} from "../../../../services/image/image.service";
import {filter, mergeMap} from "rxjs/operators";
import {from} from "rxjs";

@Component({
  selector: 'app-listagem-evento',
  templateUrl: './listagem-evento.component.html',
  styleUrls: ['./listagem-evento.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListagemEventoComponent implements OnInit {

  events: EventDTO[];

  selectedEvent: EventDTO;

  eventDialog: boolean;

  imgsSRC: string[];

  @ViewChild('dt') table: Table;

  constructor(private eventService: EventService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    if (!this.events) {
      this.eventService.getAll().subscribe(events => this.events = events);
      this.getImages();
    }
  }

  getImages() {
    return this.imageService.getAll()
        .pipe(
            mergeMap(uuids => {
              console.log(uuids);
              return from(uuids);
            }),
            mergeMap(uuid => this.imageService.getById(uuid))
        ).subscribe(result => {
          this.imgsSRC = result;
          console.log(this.imgsSRC);
        })
  }



}
