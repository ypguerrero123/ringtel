import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class RecoveryService {

    //-------------RECOVERY ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method recovery
     * @param data
     */
    public async recovery(data: {}) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(`es/api/v1/security/recovery`, Utils.getFormData(data)).subscribe(
                () => {
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
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.RECOVERY_SUCCESS).then(() => {
                            this.setErrorVars(null, null);
                        });
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
