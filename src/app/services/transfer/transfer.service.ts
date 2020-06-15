import {AppService} from '../app.service';
import {Messages} from '../../config/messages';
import {User} from '../../model/user';
import {TransferResponse} from '../../model/transfer';

export class TransferService {

    /**
     * Constructor TransferService
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method getAllTransfer
     * @param page
     * @param concat
     */
    public async getAllTransfer(page, concat: boolean = false) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/transfer/${this.appService.userType()}/${this.appService.secvars.user.id}/index/${page}`
            ).subscribe(
                (resp: TransferResponse) => {
                    if (concat) {
                        this.appService.transfvars.setConcatTransfers(resp.transfers);
                    } else {
                        this.appService.transfvars.setAllTransfers(resp.transfers);
                    }
                },
                err => {
                    let error = err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER;
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(error).then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method searchAgents
     * @param data
     */
    public async searchAgents(data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/transfer/${this.appService.secvars.user.id}/search/agent`, data).subscribe(
                (resp: User[]) => {
                    this.appService.transfvars.setAgentFounds(resp);
                },
                (err) => {
                    let error = err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER;
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(error).then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                }
            );
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
                `es/api/v1/transfer/agent-from/${this.appService.secvars.user.id}/agent-to/${agentTo}/send`, data
            ).subscribe(
                (resp: TransferResponse) => {
                    this.appService.setUser(resp.agent).then(() => {
                        this.appService.transfvars.setAllTransfers(resp.transfers);
                    });
                },
                err => {
                    let error = err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER;
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(error).then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                    });
                }
            );
        });
    }

}
