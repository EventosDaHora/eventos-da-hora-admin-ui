import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../base-resource.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {UserCreatePassword} from "../../dominio/user/user-create-password.model";
import {User} from "../../dominio/user/user.model";

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class UserCreatePasswordService extends BaseResourceService<UserCreatePassword> {

    constructor(protected injector: Injector) {
        super(`${environment.apiUrl}/eventos-da-hora-user-api/users-admin/password/create`, injector, UserCreatePassword.fromJson);
    }

    public createPassword(resource: UserCreatePassword, dsToken: string): Observable<User> {
        // @ts-ignore
        const url = `${this.apiPath}/${resource.getId()}/${dsToken}`;

        // @ts-ignore
        return this.http.put(url, resource).pipe(
            map(() => resource),
            // @ts-ignore
            catchError(this.handlerError)
        );
    }
}
