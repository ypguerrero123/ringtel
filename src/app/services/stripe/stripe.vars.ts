import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Charge, Method} from '../../model/stripe';

@Injectable({
    providedIn: 'root'
})
export class StripeVars {

    //-------------STRIPE VARs-----------------------//
    public savedPaymentMethods: Subject<Method[]> = new Subject<Method[]>();
    public customerCharges: Subject<Charge[]> = new Subject<Charge[]>();
    public clientSecret: any = null;

    /**
     * @method updateOldPaymentMethods
     * @param methods
     */
    public updateOldPaymentMethods(methods: Method[]) {
        this.savedPaymentMethods.next(methods);
    }

    /**
     * @method updateCustomerCharges
     * @param charges
     */
    public updateCustomerCharges(charges: Charge[]) {
        this.customerCharges.next(charges);
    }

}
