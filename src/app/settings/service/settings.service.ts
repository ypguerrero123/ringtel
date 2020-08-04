import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Messages} from '../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {


    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method confirmDisableAccount
     */
    public async confirmDisableAccount() {

        if (parseInt(this.appService.user.balance) >= 1) {
            return this.appService.presentToast(Messages.SPEND_ALL_CREDIT).then();
        }

        const alert = await this.appService.alertController.create({
            header: Messages.CONFIRM_ACTION,
            message: '<hr/><p>¿Está seguro que desea desabilitar su cuenta?</p>',
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
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.user.id}/disable-account`)
                .subscribe(
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.clearStorage().then(() => {
                                this.appService.router.navigate(['/login']).then();
                            });
                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                        });
                    },
                    () => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                    });
        });
    }
}
