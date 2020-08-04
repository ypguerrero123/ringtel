import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Subject} from 'rxjs';
import {Operation} from '../../../shared/model/operation';
import {Messages} from '../../../shared/config/messages';
import {Utils} from '../../../shared/utils/utils';

@Injectable({
    providedIn: 'root'
})
export class ProcessingPendingService {

    //-------------OPERATION PROCESSING PENDING VARS------------------//
    public allOperations: Subject<Operation[]> = new Subject<Operation[]>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method listProcessingPending
     */
    public async listProcessingPending() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/operation/${this.appService.userType()}/${this.appService.user.id}/list/processing-pending/index`
            ).subscribe(
                (resp: Operation[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.allOperations.next(resp);
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });
    }

    /**
     * @method deletePending
     * @param operation
     */
    public async deletePending(operation: Operation) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({'op_id': operation.id});

            this.appService.post(
                `es/api/v1/operation/${this.appService.userType()}/${this.appService.user.id}/delete/one-pending/ops`, data
            ).subscribe((resp: any) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp.user, true).then(() => {
                            this.allOperations.next(resp.result);
                        });
                    });
                },
                err => {
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
