import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Constants} from '../../../shared/config/constants';
import {User} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';
import {Utils} from '../../../shared/utils/utils';
import {AppRoutes} from '../../../shared/config/routes';

@Injectable({
    providedIn: 'root'
})
export class OtpService {

    //-------------OTP ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    constructor(public appService: AppService) {
    }

    /**
     * @method repeatOTP
     */
    public async repeatOTP(data: {} = null) {

        const user = await this.appService.getStorage(Constants.USER_AUTH_KEY);
        if (!user) {
            return;
        }

        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/security/${user.id}/repeat-otp`, data).subscribe(
                (resp: User) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp);
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        if (err.status == 400) {
                            this.errorPath = err.error.path;
                            this.errorMessage = err.error.error;
                        } else {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                        }
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION);
                });
        });
    }

    /**
     * @method verifyOTP
     * @param otp
     */
    public async verifyOTP(otp: string) {
        const user = await this.appService.getStorage(Constants.USER_AUTH_KEY);
        if (user) {
            this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
                this.appService.post(
                    `es/api/v1/security/${user.id}/verify-otp-code`, Utils.getFormData({'otp': otp})
                ).subscribe(
                    (resp: User) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp).then(() => {
                                this.appService.deleteStorage(Constants.REGISTER_OTP_PROCCESS).then(() => {
                                    this.appService.navigateToUrl(AppRoutes.APP_SUCCESS);
                                });
                            });
                        });
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(
                                err.status == 400 ? err.error.error : Messages.ERROR_PLEASE_TRY_LATER
                            );
                        });
                    });
            });
        }

    }
}
