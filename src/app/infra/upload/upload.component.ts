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

  onUpload(file) {
    if (file.files.length > 0) {
      const mimeType = file. files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      const reader = new FileReader();
      this.imagePath = file.files;
      reader.readAsDataURL(file.files[0]);

      reader.onload = (evt) => {
        this.imgURL = reader.result;
        this.imagemOutput.emit({file: file.files[0], imgUrl: this.imgURL});
        this.imgURL = undefined;
        file = undefined;
      };
    }
  }

}

export interface ImageMetadata {
  file: File;
  imgUrl: any;
}
