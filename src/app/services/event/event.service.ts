import {Injectable, Injector} from '@angular/core';
import {EventDTO, LocalizationDTO} from "../../dominio/Event";
import {BaseResourceService} from "../base-resource.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EventService extends BaseResourceService {

    constructor(injector: Injector, http: HttpClient) {
        super(`${environment.apiUrl}/eventos-da-hora-event-api/events`, injector);
    }

    createEmptyEvent(): EventDTO {
        return {
            date: "",
            description: "",
            idCategory: 0,
            images: [],
            localization: {},
            name: "",
            sections: []
        }
    }


}
