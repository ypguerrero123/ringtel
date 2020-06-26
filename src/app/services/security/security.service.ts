import {AppService} from '../app.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../../model/user';
import {Constants} from '../../config/constants';
import {Messages} from '../../config/messages';
import {Utils} from '../utils/utils';
import {AppRoutes} from '../../config/routes';

/**
 * SecurityService
 */
export class SecurityService {

    /**
     * Constructor SecurityService
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method login
     * @param data
     */
    public async login(data: any) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });

            this.appService.post('es/api/v1/security/login', data, headers).subscribe(
                (resp: User) => {
                    this.setUser(resp).then(() => {
                        this.appService.navigateToUrl(AppRoutes.APP_HOME_PAGE);
                    });
                },
                err => {
                    this.setUser(null, false).then(() => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(
                                err.status === 401 ? Messages.INVALID_CREDENTIAL : Messages.ERROR_PLEASE_TRY_LATER
                            ).then();
                        });
                    });

                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method logout
     */
    public async logout() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.deleteStorage(Constants.USER_AUTH_KEY).then(() => {
                this.appService.router.navigate(['/login']).then(() => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.secvars.setUser(null, false);
                    });
                });
            });
        });
    }

    /**
     * @method recovery
     * @param data
     */
    public async recovery(data: {}) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.secvars.clearRegisterVars();
            this.appService.post(`es/api/v1/security/recovery`, Utils.getFormData(data)).subscribe(
                () => {
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        if (err.status == 400) {
                            this.appService.secvars.setRegisterErrorVars(err);
                        } else {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                        }
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.secvars.clearRegisterVars();
                    });
                });
        });
    }

    /**
     * @method register
     * @param data
     */
    public async register(data: any) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.secvars.clearRegisterVars();
            this.appService.post(`es/api/v1/security/register`, data).subscribe(
                (resp: User) => {
                    this.setUser(resp).then(() => {
                        this.appService.setStorage(Constants.REGISTER_OTP_PROCCESS, true, false).then(() => {
                            this.appService.navigateToUrl(AppRoutes.APP_OTP);
                        });
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        if (err.status == 400) {
                            this.appService.secvars.setRegisterErrorVars(err);
                        } else {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                        }
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.secvars.clearRegisterVars();
                    });
                });
        });
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
                    this.setUser(resp);
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        if (err.status == 400) {
                            this.appService.secvars.setRegisterErrorVars(err);
                        } else {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                        }
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION);
                    });
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
                        this.setUser(resp).then(() => {
                            this.appService.deleteStorage(Constants.REGISTER_OTP_PROCCESS).then(() => {
                                this.appService.navigateToUrl(AppRoutes.APP_SUCCESS);
                            });
                        });
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(
                                err.status == 400 ? err.error.error : Messages.ERROR_PLEASE_TRY_LATER
                            );
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then();
                    });
            });
        }

    }

    /**
     * @method getUser
     * @param userHasUpdate
     */
    public async getUser(userHasUpdate: boolean = true) {
        const user = await this.appService.getStorage(Constants.USER_AUTH_KEY);
        this.appService.secvars.setUser(user, userHasUpdate);
        return user;
    }

    /**
     * @method setUser
     * @param resp
     * @param userHasUpdate
     */
    public async setUser(resp: User = null, userHasUpdate: boolean = true) {
        this.appService.secvars.setUser(resp, userHasUpdate);
        await this.appService.setStorage(Constants.USER_AUTH_KEY, resp);
    }
}
