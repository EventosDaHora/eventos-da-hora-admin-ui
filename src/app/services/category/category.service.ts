import {BaseResourceService} from "../base-resource.service";
import {Injectable, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseResourceService {

    constructor(injector: Injector, http: HttpClient) {
        super(`${environment.apiUrl}/eventos-da-hora-event-api/categories`, injector, null);
    }
}
