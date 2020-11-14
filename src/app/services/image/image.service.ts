import {Injectable, Injector} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseResourceService} from "../base-resource.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImageFile} from "../../dominio/image-file.model";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseResourceService{

  urlImage = `${environment.apiUrl}/eventos-da-hora-image-api/images`;
  fileInput: FormData;

  constructor(injector: Injector, http: HttpClient) {
    super(`${environment.apiUrl}/eventos-da-hora-image-api/images`, injector);
    this.fileInput = new FormData();
  }

  upload(resourceFile: File): Observable<ImageFile> {
    this.fileInput.set('file', resourceFile);
    return this.http.post(this.urlImage,  this.fileInput).pipe(
        map(a => ImageFile.fromJson(a)),
        catchError(this.handlerError)
    );
  }

  getById(id: any): Observable<any> {
    const url = `${this.urlImage}/${id}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
        catchError(this.handlerError)
    );
  }
}
