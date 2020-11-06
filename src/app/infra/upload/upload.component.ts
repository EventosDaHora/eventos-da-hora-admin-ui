import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from 'primeng';
import {AbstractControleValueAccessor} from '../AbstractControleValueAccessor';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [MessageService]
})
export class UploadComponent extends AbstractControleValueAccessor {

  @Input()
  label ?: string;

  @Input()
  imageMetadata: ImageMetadata;

  @Output()
  imagemOutput = new EventEmitter<ImageMetadata>();

  imgURL: any;

  imagePath: any;

  constructor() {
    super();
  }

  onUpload(files) {
    if (files.length > 0) {
      const mimeType = files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);

      reader.onload = (evt) => {
        this.imgURL = reader.result;
        this.imagemOutput.emit({file: files[0], imgUrl: this.imgURL});
      };
    }
  }

}

export interface ImageMetadata {
  file: File;
  imgUrl: any;
}
