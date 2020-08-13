import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Subject} from 'rxjs';
import {Transfer, TransferResponse} from '../../../shared/model/transfer';
import {Messages} from '../../../shared/config/messages';
import {Utils} from '../../../shared/utils/utils';

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
                    this.appService.dismissLoading(loading).then(() => {
                        if (concat) {
                            this.concatTransfers.next(resp.transfers);
                        } else {
                            this.allTransfers.next(resp.transfers);
                        }
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                });
        });
    }
}
