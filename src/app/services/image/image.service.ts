import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../base-resource.service";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseResourceService{

  urlImage = `${environment.apiUrl}/eventos-da-hora-image-api/images`;

  constructor(injector: Injector, http: HttpClient) {
    super(`${environment.apiUrl}/eventos-da-hora-image-api/images`, http);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.urlImage, formData, {
      reportProgress: true,
      responseType: 'blob'
    });

    return this.http.request(req);
  }

  getById(id: any): Observable<any> {
    const url = `${this.urlImage}/${id}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
        catchError(this.handlerError)
    );
  }


}
