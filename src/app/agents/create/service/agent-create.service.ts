import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {AppRoutes} from '../../../shared/config/routes';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class AgentCreateService {

    //-------------AGENT CREATE ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    private validErrors: string[] = ['fullName', 'email', 'phoneCodeNumber', 'phone', 'salePriceCubacel', 'salePriceNauta'];

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method createAgent
     * @param data
     */
    public async createAgent(data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/create/agent`, data)
                .subscribe(
                    (resp: any) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp.admin).then(() => {
                                this.appService.navigateToUrl(AppRoutes.APP_AGENTS_LIST);
                            });
                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.setErrorVars(err.error.path, err.error.error);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
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
