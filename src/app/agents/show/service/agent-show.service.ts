import {AppService} from '../../../shared/service/app.service';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserDataResponse} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class AgentShowService {

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
     * @param start
     * @param end
     */
    public async getAgentOperationData(agentId, start, end) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/get/${agentId}/agent/${start}/${end}/data`
            ).subscribe(
                (resp: UserDataResponse) => {
                    this.agentOperationData.next(resp);
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }
}
