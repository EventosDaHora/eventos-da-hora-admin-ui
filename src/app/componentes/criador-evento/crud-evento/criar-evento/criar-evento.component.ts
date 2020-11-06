import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng';
import {ImagemEventoComponent} from './imagem-evento/imagem-evento.component';
import {EventService} from "../../../../services/event/event.service";
import {EventDTO} from "../../../../dominio/Event";
import {CategoryService} from "../../../../services/category/category.service";
import {map} from "rxjs/operators";
import {Category} from "../../../../dominio/Category";

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.scss'],
  providers: [DialogService]
})
export class CriarEventoComponent implements OnInit, OnDestroy {

  event: EventDTO;

  categories: Category[];

  idCategory: number;
  
  date: Date;
  
  hora: Date;

  ref: DynamicDialogRef;

  constructor(private eventService: EventService,
              public dialogService: DialogService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.event = this.eventService.createEmptyEvent();
    this.categoryService.getAll().pipe(
      map(categories => categories as Category[])
    ).subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  adicionarImagens() {
    this.ref = this.dialogService.open(ImagemEventoComponent, {
      data: this.event,
      header: 'Adicionar Imagens',
      width: '80%',
      style: {'margin-top': '4em'},
      contentStyle: {'max-height': '800px', overflow: 'auto', 'background-color': '#151A30'},
      closeOnEscape: false
    });

    this.ref.onClose.subscribe(() => {
      console.log('Fechou');
    })
  }

  submit() {
    console.log(this.idCategory);
    this.montaDataHora();
    this.getIdCategoria();
    console.log(this.event);
    this.eventService.create(this.event).subscribe(resposta => console.log(resposta));
  }

  getIdCategoria() {
    this.event.idCategory = this.idCategory;
  }

  montaDataHora() {
    const date = this.date.toLocaleDateString('pt-BR');
    const horas = this.hora.getHours() < 10 ? "0" + this.hora.getHours() : this.hora.getHours();
    const minutos = this.hora.getMinutes() < 10 ? "0" + this.hora.getMinutes() : this.hora.getMinutes();
    console.log(`${date}T${horas}:${minutos}`);
    this.event.date = `${date}T${horas}:${minutos}`;
  }

}

