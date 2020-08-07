import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {User} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class ProfileSalesService {

    //-------------PROFILE SALES ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    private validErrors: string[] = ['sellingCostCubacel', 'sellingCostNauta'];


    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method updateSalesProfile
     * @param pathParameter
     * @param newData
     */
    public async updateSalesProfile(pathParameter: string, newData: {}) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.user.id}/${pathParameter}`, newData)
                .subscribe(
                    (resp: User) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp);
                        });
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.setErrorVars(err.error.path, err.error.error);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                            }
                        });
                    },
                    () => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION).then(() => {
                            this.setErrorVars(null, null);
                        });
                    });
        });
    }

    /**
     * @method setErrorVars
     * @param path
     * @param message
     */
    private setErrorVars(path, message) {

        if (!path || (path && this.validErrors.includes(path)) ) {

            this.errorPath = path;
            this.errorMessage = message;

            return;
        }

        return this.appService.presentToast(`${Messages.ERROR_PLEASE_TRY_LATER}. ${path} ${message}`);
    }

}
