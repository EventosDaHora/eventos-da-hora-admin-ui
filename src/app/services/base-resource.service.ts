import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Directive, Injector} from "@angular/core";
import {BaseResourceModel} from "../dominio/base-resource.model";

@Directive()
// @ts-ignore
export abstract class BaseResourceService {

    public http: HttpClient;

    constructor(public  apiPath: string,
                public  injector: Injector,
                public  jsonDataToResourceFn: (jsonData: any) => any
    ) {
        this.http = injector.get(HttpClient);
    }

    public getAll(): Observable<any[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handlerError)
        );
    }

    public getById(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handlerError)
        );
    }

    public create(resource: any): Observable<any> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handlerError)
        );
    }

    public doPost(resource: any, path: string): Observable<any> {
        return this.http.post(this.apiPath + path, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handlerError)
        );
    }

    public update(resource: any): Observable<any> {
        const url = `${this.apiPath}/${resource.getId()}`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handlerError)
        );
    }

    public delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            catchError(this.handlerError),
            map(() => null)
        );
    }

    public jsonDataToResources(jsonData: any[]): any[] {
        const resources: any[] = [];
        jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
        return resources;
    }

    public jsonDataToResource(jsonData: any): any {
        return this.jsonDataToResourceFn(jsonData);
    }

    public handlerError(error: any): Observable<any> {
        console.log('Error to request -> ', error);
        return throwError(error);
    }

}
