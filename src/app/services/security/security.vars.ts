import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SecurityVars {

    //-------------AUTH VARS-----------------------//
    public userHasUpdate: Subject<User> = new Subject<User>();
    public user: User = null;

    //-------------REGISTER VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    /**
     * @method setUser
     * @param user
     * @param userHasUpdate
     */
    public setUser(user: User = null, userHasUpdate: boolean = true) {
        if (userHasUpdate) {
            this.userHasUpdate.next(user);
        }
        this.user = user;
    }

    /**
     * @method setRegisterErrorVars
     * @param err
     */
    public setRegisterErrorVars(err: any) {
        this.errorPath = err.error.path;
        this.errorMessage = err.error.error;
    }

    /**
     * @method clearRegisterVars
     */
    public clearRegisterVars() {
        this.errorPath = null;
        this.errorMessage = null;
    }
}
