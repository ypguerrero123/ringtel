import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Subject} from 'rxjs';
import {Transfer, TransferResponse} from '../../../shared/model/transfer';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class TransferListService {

    //----------------TRANSFER CREATE VARS--------------------//
    public allTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();
    public concatTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAllTransfer
     * @param page
     * @param concat
     */
    public async getAllTransfer(page, concat: boolean = false) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/transfer/${this.appService.userType()}/${this.appService.user.id}/index/${page}`
            ).subscribe(
                (resp: TransferResponse) => {
                    if (concat) {
                        this.concatTransfers.next(resp.transfers);
                    } else {
                        this.allTransfers.next(resp.transfers);
                    }
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }
}
