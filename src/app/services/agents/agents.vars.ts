import {Injectable} from '@angular/core';
import {User, UserDataResponse} from '../../model/user';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgentsVars {

    //-------------AGENT VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    /**
     * @var Subject
     */
    public allAgents: Subject<User[]> = new Subject<User[]>();
    /**
     * @var Subject
     */
    public agentOperationData: Subject<UserDataResponse> = new Subject<UserDataResponse>();

    /**
     * @var Subject
     */
    public agent: Subject<User> = new Subject<User>();

    /**
     * @method setAgent
     * @param agent
     */
    public setAgent(agent: User) {
        this.agent.next(agent);
    }

    /**
     * @method setAgentOperationData
     * @param agent
     */
    public setAgentOperationData(agent: UserDataResponse) {
        this.agentOperationData.next(agent);
    }

    /**
     * @method setAllAgents
     * @param users
     */
    public setAllAgents(users: User[]) {
        this.allAgents.next(users);
    }

    /**
     * @method setAgentErrorVars
     * @param err
     */
    public setAgentErrorVars(err: any) {
        this.errorPath = err.error.path;
        this.errorMessage = err.error.error;
    }

    /**
     * @method clearAgentVars
     */
    public clearAgentVars() {
        this.errorPath = null;
        this.errorMessage = null;
    }

}
