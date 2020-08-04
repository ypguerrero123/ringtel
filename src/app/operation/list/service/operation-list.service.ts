import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Subject} from 'rxjs';
import {Operation} from '../../../shared/model/operation';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class OperationListService {

    //-------------OPERATION LIST VARS------------------//
    public allOperations: Subject<Operation[]> = new Subject<Operation[]>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAllOperations
     * @param start
     * @param end
     * @param page
     */
    public async getAllOperations(start, end, page) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/operation/${this.appService.userType()}/${this.appService.user.id}/date/${start}/to/${end}/filter/${page}`
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

}
