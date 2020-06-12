import {AppService} from "../app.service";
import {User, UserDataResponse} from "../../model/user";
import {Messages} from "../../config/messages";
import {AppRoutes} from "../../config/routes";

export class AgentsService {

    /**
     * Constructor AgentsService
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method getAllAgents
     */
    public async getAllAgents() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.secvars.user.id}/agents/all`)
                .subscribe(
                    (resp: User[]) => {
                        this.appService.agentsVars.setAllAgents(resp);
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark').then();
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then();
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
                `es/api/v1/administrator/${this.appService.secvars.user.id}/get/${agentId}/agent`)
                .subscribe(
                    (resp: User) => {
                        this.appService.agentsVars.setAgent(resp);
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark');
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then();
                    });
        });
    }

    /**
     * @method createAgent
     * @param data
     */
    public async createAgent(data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.agentsVars.clearAgentVars();
            this.appService.post(
                `es/api/v1/administrator/${this.appService.secvars.user.id}/create/agent`, data)
                .subscribe(
                    (resp: any) => {
                        this.appService.setUser(resp.admin).then(() => {
                            this.appService.navigateToUrl(AppRoutes.APP_AGENTS_LIST);
                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.appService.agentsVars.setAgentErrorVars(err);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark');
                            }
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                        });
                    });
        });
    }

    /**
     * @method editAgent
     * @param agentId
     * @param data
     */
    public async editAgent(agentId, data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.agentsVars.clearAgentVars();
            this.appService.post(
                `es/api/v1/administrator/${this.appService.secvars.user.id}/edit/${agentId}/agent/profile`, data)
                .subscribe(
                    (resp: any) => {
                        this.appService.setUser(resp.admin).then();
                        this.appService.agentsVars.setAgent(resp.agent);
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.appService.agentsVars.setAgentErrorVars(err);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark');
                            }
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then();
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
                `es/api/v1/administrator/${this.appService.secvars.user.id}/delete/${agentId}/agent`)
                .subscribe(
                    (resp: User) => {
                        this.appService.setUser(resp).then(() => {
                            this.appService.getAllAgents().then();
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark').then();
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                        });
                    });
        });
    }

    /**
     * @method getAgentData
     * @param agentId
     * @param data
     */
    public async getAgentOperationData(agentId, data) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/administrator/${this.appService.secvars.user.id}/get/${agentId}/agent/data`, data)
                .subscribe(
                    (resp: UserDataResponse) => {
                        this.appService.agentsVars.setAgentOperationData(resp);
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER, 'dark').then();
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then();
                    });
        });
    }

}
