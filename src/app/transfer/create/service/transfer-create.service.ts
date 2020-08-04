import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Subject} from 'rxjs';
import {User} from '../../../shared/model/user';
import {Transfer, TransferResponse} from '../../../shared/model/transfer';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class TransferCreateService {

    //----------------TRANSFER CREATE VARS--------------------//
    public agentsFounds: Subject<User[]> = new Subject<User[]>();
    public allTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();
    public concatTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method searchAgents
     * @param data
     */
    public async searchAgents(data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/transfer/${this.appService.user.id}/search/agent`, data
            ).subscribe(
                (resp: User[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.agentsFounds.next(resp);
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });
    }

    /**
     * @method transferCredit
     * @param agentTo
     * @param data
     */
    public async transferCredit(agentTo, data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/transfer/agent-from/${this.appService.user.id}/agent-to/${agentTo}/send`, data
            ).subscribe(
                (resp: TransferResponse) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp.agent).then(() => {
                            this.allTransfers.next(resp.transfers);
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
                }
            );
        });
    }

}
