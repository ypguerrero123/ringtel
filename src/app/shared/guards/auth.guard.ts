import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../service/app.service';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    /**
     * Constructor AuthGuard
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.appService.getUser().then((value: User) => {
            if (value) {
                this.appService.updateToken(false).then();
            }
            return !!value;
        });
    }

}
