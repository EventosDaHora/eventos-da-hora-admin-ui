import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../base-resource.service";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseResourceService{

  urlUpload = `${environment.apiUrl}/eventos-da-hora-image-api/images`;

  constructor(injector: Injector, http: HttpClient) {
    super(`${environment.apiUrl}/eventos-da-hora-image-api/images`, http);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.urlUpload, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


}
