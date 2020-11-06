import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {ImagemEventoComponent} from './imagem-evento/imagem-evento.component';
import {EventService} from "../../../../services/event/event.service";
import {CategoryDTO, EventDTO} from "../../../../dominio/Event";
import {CategoryService} from "../../../../services/category/category.service";
import {map} from "rxjs/operators";
import {ImageService} from "../../../../services/image/image.service";
import {ImageMetadata} from "../../../../infra/upload/upload.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.scss'],
  providers: [DialogService]
})
export class CriarEventoComponent implements OnInit, OnDestroy {

  event: EventDTO;

  categories: CategoryDTO[];

  idCategory: number;
  
  date: Date;
  
  hora: Date;

  ref: DynamicDialogRef;

  imageMetadata: ImageMetadata;

  termoAceito: false;

  constructor(private eventService: EventService,
              public dialogService: DialogService,
              private categoryService: CategoryService,
              private imageService: ImageService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.event = this.eventService.createEmptyEvent();
    this.categoryService.getAll().pipe(
      map(categories => categories as CategoryDTO[])
    ).subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  submit(form: NgForm) {
    if (form.invalid || !this.termoAceito) {
      this.addSingle();
      return;
    }
    this.montaDataHora();

    this.getIdCategoria();

    this.imageService.upload(this.imageMetadata.file).subscribe(response => {

      this.event.images.push({imageId: undefined, imageType: this.imageMetadata.file.type});
      debugger
      this.eventService.create(this.event).subscribe(resposta => console.log(resposta));
    });

    form.resetForm();
  }

  addImagem(event: ImageMetadata) {
    this.imageMetadata = event;
    this.event.images.push({imageId: undefined, imageType: event.file.type});
  }

  addSingle() {
    this.messageService.add({severity:'error', summary:'Erro', detail:'Todos os campos são obrigatórios'});
  }

  clear() {
    this.messageService.clear();
  }

  getIdCategoria() {
    this.event.idCategory = this.idCategory;
  }

  montaDataHora() {
    const date = this.date.toLocaleDateString('pt-BR');
    const horas = this.hora.getHours() < 10 ? "0" + this.hora.getHours() : this.hora.getHours();
    const minutos = this.hora.getMinutes() < 10 ? "0" + this.hora.getMinutes() : this.hora.getMinutes();
    this.event.date = `${date}T${horas}:${minutos}`;
  }

}

