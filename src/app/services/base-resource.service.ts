import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Directive, Injector} from "@angular/core";

@Directive()
// @ts-ignore
export abstract class BaseResourceService {

  constructor(protected apiPath: string, protected http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<any[]> {
    return this.http.get(this.apiPath).pipe(
        catchError(this.handlerError)
    );
  }

  getById(id: any): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handlerError)
    );
  }

  create(resource: any): Observable<any> {
    return this.http.post(this.apiPath, JSON.stringify(resource), this.httpOptions).pipe(
      catchError(this.handlerError)
    );
  }

  doPost(resource: any, path:string): Observable<any> {
    return this.http.post(this.apiPath + path, JSON.stringify(resource), this.httpOptions).pipe(
      catchError(this.handlerError)
    );
  }

  update(resource: any, id: any): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.put(url, JSON.stringify(resource)).pipe(
      map(() => resource),
      catchError(this.handlerError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null)
    );
  }

  protected handlerError(error: any): Observable<any> {
    console.log('Error to request -> ', error);
    return throwError(error);
  }

}
