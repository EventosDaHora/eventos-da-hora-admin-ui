import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from "../base-resource.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {User} from "../../dominio/user/user.model";
import {UserResetPassword} from "../../dominio/user/user-reset-password.model";

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class UserResetPasswordService extends BaseResourceService<UserResetPassword> {

    constructor(protected injector: Injector) {
        super(`${environment.apiUrl}/eventos-da-hora-user-api/users-admin/password/reset`, injector, UserResetPassword.fromJson);
    }

    public resetPassword(resource: UserResetPassword): Observable<User> {
        // @ts-ignore
        const url = `${this.apiPath}/${resource.dsEmail}`;
        // @ts-ignore
        return this.http.post(url, null).pipe(
            map(() => resource),
            // @ts-ignore
            catchError(this.handlerError)
        );
    }
}
