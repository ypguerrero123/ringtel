import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Operation} from '../../../shared/model/operation';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class OperationShowService {

    //-------------OPERATION SHOW VARS------------------//
    public operation: Operation;
    public loadedOperation = false;

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method showOperation
     * @param opId
     */
    public async showOperation(opId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/operation/${this.appService.userType()}/${this.appService.user.id}/show/${opId}`
            ).subscribe((resp: Operation) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.operation = resp;
                        this.loadedOperation = true;
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });

    }

}
