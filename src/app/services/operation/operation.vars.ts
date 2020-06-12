import {Recharge} from '../../model/recharge';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Operation} from '../../model/operation';

@Injectable({
    providedIn: 'root'
})
export class OperationVars {
    //-------------RECHARGE VARS--------------------//
    public cubacelRecharges: Recharge[];
    public nautaRecharges: Recharge[];
    public longDistanceRecharges: Recharge[];
    public hasLoadRecharges = false;
    public preSalesActive = false;

    //-------------HISTORY VARS------------------//
    public allOperations: Subject<Operation[]> = new Subject<Operation[]>();
    public operation: Operation;
    public loadedOperation = false;

    /**
     * @method setAllOperations
     * @param operations
     */
    public setAllOperations(operations: Operation[]) {
        this.allOperations.next(operations);
    }

}
