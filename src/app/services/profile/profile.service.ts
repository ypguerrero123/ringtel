import {AppService} from '../app.service';
import {User, UserDataResponse} from '../../model/user';
import {Messages} from '../../config/messages';
import {Utils} from "../utils/utils";
import {Constants} from "../../config/constants";

/**
 * ProfileService
 */
export class ProfileService {

    /**
     * Constructor ProfileService
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method getProfile
     * @param data
     */
    public async getProfile(data) {
        this.appService.post(
            `es/api/v1/profile/${this.appService.userType()}/${this.appService.secvars.user.id}/get-profile`, data)
            .subscribe(
                (resp: UserDataResponse) => {
                    this.appService.setUser(resp.agent, false).then(() => {
                        this.appService.agentsVars.setAgentOperationData(resp);
                    });
                },
                () => {
                    this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark');
                },
                () => {
                });
    }

    /**
     * @method updateProfile
     * @param pathParameter
     * @param newData
     */
    public async updateProfile(pathParameter: string, newData: {}) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.secvars.clearRegisterVars();
            this.appService.post(
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.secvars.user.id}/${pathParameter}`, newData)
                .subscribe(
                    (resp: User) => {
                        this.appService.setUser(resp);
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.appService.secvars.setRegisterErrorVars(err);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark');
                            }
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then(() => {
                                this.appService.secvars.clearRegisterVars();
                            });
                        });
                    });
        });
    }

    /**
     * @method updateToken
     * @param userHasUpdate
     */
    public async updateToken(userHasUpdate: boolean = true) {
        if (this.appService.secvars.user) {
            this.appService.getStorage(Constants.TOKEN_DEVICE_KEY, false).then((token) => {
                if (!token) return;
                this.appService.post(
                    `es/api/v1/profile/${this.appService.userType()}/${this.appService.secvars.user.id}/token-device`, Utils.getFormData({'token': token})
                ).subscribe((resp: User) => {
                    this.appService.setUser(resp, userHasUpdate);
                });
            });
        }
    }

    /**
     * @method confirmDisableAccount
     */
    public async confirmDisableAccount() {

        if (parseInt(this.appService.secvars.user.balance) >= 1) {
            return this.appService.presentToast(Messages.SPEND_ALL_CREDIT, 'dark').then();
        }

        const alert = await this.appService.alertController.create({
            header: Messages.CONFIRM_ACTION,
            message: '<p>¿Está seguro que desea desabilitar su cuenta?</p>',
            buttons: [
                {
                    text: Messages.CANCEL,
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: Messages.DONE,
                    handler: () => {
                        this.disableAccount().then();
                    }
                }
            ]
        });

        await alert.present();
    }

    /**
     * @method disableAccount
     */
    private async disableAccount() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.secvars.user.id}/disable-account`)
                .subscribe(
                    () => {
                        this.appService.clearStorage().then(() => {
                            this.appService.router.navigate(['/login']).then();
                        })
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER, 'dark').then();
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                        });
                    });
        });
    }

}
