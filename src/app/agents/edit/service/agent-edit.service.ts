import {AppService} from '../../../shared/service/app.service';
import {Messages} from '../../../shared/config/messages';
import {Subject} from 'rxjs';
import {User} from '../../../shared/model/user';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AgentEditService {

    //-------------AGENT EDIT ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    /**
     * @var Subject
     */
    public agent: Subject<User> = new Subject<User>();

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method editAgent
     * @param agentId
     * @param data
     */
    public async editAgent(agentId, data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/edit/${agentId}/agent/profile`, data)
                .subscribe(
                    (resp: any) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.setUser(resp.admin).then();
                            this.agent.next(resp.agent);
                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.setErrorVars(err.error.path, err.error.error);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
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
     * @method getAgent
     * @param agentId
     */
    public async getAgent(agentId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.user.id}/get/${agentId}/agent`)
                .subscribe(
                    (resp: User) => {
                        this.agent.next(resp);
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

    /**
     * @method setErrorVars
     * @param path
     * @param message
     */
    private setErrorVars(path, message) {
        this.errorPath = path;
        this.errorMessage = message;
    }
}
