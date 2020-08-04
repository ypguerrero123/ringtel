import {AppService} from '../../../shared/service/app.service';
import {Injectable} from '@angular/core';
import {User} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgentListService {

    /**
     * @var Subject
     */
    public allAgents: Subject<User[]> = new Subject<User[]>();

    /**
     * Contrsuctor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAllAgents
     */
    public async getAllAgents() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/agents/all`
            ).subscribe(
                (resp: User[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.allAgents.next(resp);
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });
    }

    /**
     * @method deleteAgent
     * @param agentId
     */
    public async deleteAgent(agentId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/delete/${agentId}/agent`)
                .subscribe(
                    (resp: User) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp).then(() => {
                                this.getAllAgents().then();
                            });
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                        });
                    },
                    () => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                    });
        });
    }
}
