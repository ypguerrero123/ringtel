import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '../service/app.service';

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

        return this.appService.getUser().then((value) => {
            if (value) {
                this.appService.updateToken(false).then();
            }
            return !!value;
        });
    }

}
