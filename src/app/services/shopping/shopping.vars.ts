import {Shopping} from '../../model/shopping';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingVars {

    //-------------SHOPPING CART--------------------//
    public AllShoppings: Subject<Shopping[]> = new Subject<Shopping[]>();

    /**
     * @method setAllShoppings
     * @param shoppings
     */
    public setAllShoppings(shoppings: Shopping[]) {
        this.AllShoppings.next(shoppings);
    }
}
