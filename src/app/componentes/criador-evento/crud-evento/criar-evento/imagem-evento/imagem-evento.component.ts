import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageMetadata} from "../../../../../infra/upload/upload.component";

@Component({
  selector: 'app-imagem-evento',
  templateUrl: './imagem-evento.component.html',
  styleUrls: ['./imagem-evento.component.scss']
})
export class ImagemEventoComponent {

  constructor() { }

  imgSRC: any;

  @Output()
  imagemOutput = new EventEmitter<ImageMetadata>();

  carregaImagem(event: ImageMetadata) {
    this.imgSRC = event.imgUrl;
    this.imagemOutput.emit(event);
  }

}
