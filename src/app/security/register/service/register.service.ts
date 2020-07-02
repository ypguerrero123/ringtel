import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {User} from '../../../shared/model/user';
import {Constants} from '../../../shared/config/constants';
import {AppRoutes} from '../../../shared/config/routes';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    //-------------REGISTER ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    constructor(public appService: AppService) {
    }

    /**
     * @method register
     * @param data
     */
    public async register(data: any) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(`es/api/v1/security/register`, data).subscribe(
                (resp: User) => {
                    this.appService.setUser(resp).then(() => {
                        this.appService.setStorage(Constants.REGISTER_OTP_PROCCESS, true, false).then(() => {
                            this.appService.navigateToUrl(AppRoutes.APP_OTP);
                        });
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        if (err.status == 400) {
                            this.setErrorVars(err.error.path, err.error.error);
                        } else {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                        }
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
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
        this.errorPath = path;
        this.errorMessage = message;
    }
}
