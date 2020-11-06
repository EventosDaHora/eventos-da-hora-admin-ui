import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../base-resource.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FotosService extends BaseResourceService{



  constructor(injector: Injector, http: HttpClient) {
    super(`${environment.apiUrl}/eventos-da-hora-image-api/images`, http);
  }

  post(resource: any, path: string, file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post(this.apiPath + path, data).pipe(
        catchError(this.handlerError)
    );
  }


}
