import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {Messages} from '../../../shared/config/messages';
import {User} from '../../../shared/model/user';
import {Subject} from 'rxjs';
import {Utils} from '../../../shared/utils/utils';

@Injectable({
    providedIn: 'root'
})
export class AgentTransferService {

    //-------------AGENT TRANSFER ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    private validErrors: string[] = ['newBalance'];

    /**
     * @var Subject
     */
    public allAgents: Subject<User[]> = new Subject<User[]>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAllAgentsToSelect
     */
    public async getAllAgentsToSelect() {
        this.appService.post(
            `es/api/v1/administrator/${this.appService.user.id}/agents/all`
        ).subscribe(
            (resp: User[]) => {
                this.allAgents.next(resp);
            },
            () => {
                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
            });
    }

    /**
     * @method editAgentBalance
     * @param data
     */
    public async editAgentBalance(data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/transfer/agent/balance`, data)
                .subscribe(
                    (resp: any) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp.user).then(() => {
                                this.allAgents.next(resp.agents);
                            });
                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.setErrorVars(err.error.path, err.error.error);
                            } else {
                                this.appService.presentToast(Utils.pareseError(err));
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
