import {AppService} from '../../../shared/service/app.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserDataResponse} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';
import {Operation} from '../../../shared/model/operation';

@Injectable({
    providedIn: 'root'
})
export class AgentShowService {

    //-------------AGENT SHOW VARS------------------//
    public allOperations: Subject<Operation[]> = new Subject<Operation[]>();
    /**
     * @var Subject
     */
    public agentOperationData: Subject<UserDataResponse> = new Subject<UserDataResponse>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAgentData
     * @param agentId
     */
    public async getAgentOperationData(agentId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/get/${agentId}/agent/data`
            ).subscribe(
                (resp: any) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.agentOperationData.next(resp.user_data);
                        this.allOperations.next(resp.user_recharges);
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });
    }
}
