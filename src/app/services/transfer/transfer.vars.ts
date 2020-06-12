import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "../../model/user";
import {Transfer} from "../../model/transfer";

@Injectable({
    providedIn: 'root'
})
export class TransferVars {

    /**
     * @var Subject
     */
    public agentsFounds: Subject<User[]> = new Subject<User[]>();
    public allTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();
    public concatTransfers: Subject<Transfer[]> = new Subject<Transfer[]>();

    /**
     * @method setAgentFounds
     * @param agents
     */
    public setAgentFounds(agents: User[]) {
        this.agentsFounds.next(agents);
    }

    /**
     * @method setAllTransfers
     * @param tranfers
     */
    public setAllTransfers(tranfers: Transfer[]) {
        this.allTransfers.next(tranfers);
    }

    /**
     * @method setConcatTransfers
     * @param tranfers
     */
    public setConcatTransfers(tranfers: Transfer[]) {
        this.concatTransfers.next(tranfers);
    }

}
