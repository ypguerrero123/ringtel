import {Recharge, RechargeEntity} from './recharge';
import {Messages} from '../config/messages';
import {User} from './user';

export interface Shopping {
    id: any;
    client: string;
    account: string;
    service: string;
    errorMessage: string;
    recharge: Recharge,
}

export class ShoppingFormEntity implements Shopping {
    id: any;
    account: string;
    client: string;
    errorMessage: string;
    recharge: Recharge;
    service: string;

    /**
     * Constructor
     * @param formValue
     * @param recharge
     * @param service
     * @param ccodePhoneValue
     */
    constructor(formValue: any, recharge: Recharge, service, ccodePhoneValue: string = null) {
        this.id = Math.random();
        this.client = formValue.client ? formValue.client : 'Cliente';
        this.account = service == Messages.NAUTA_LOWER
            ? `${formValue.account}@nauta.com.cu`
            : (service == Messages.LONG_DISTANCE_LOWER && ccodePhoneValue
                ? `${ccodePhoneValue}${formValue.account}`
                : formValue.account);
        this.errorMessage = null;
        this.service = service;
        this.recharge = recharge;
    }

}

export class ShoppingResponseEntity implements Shopping {
    account: string;
    client: string;
    errorMessage: string;
    id: any;
    recharge: Recharge;
    service: string;

    constructor(attributes: any, user: User) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this[key] = attributes[key];
            }
        }
        this.recharge = new RechargeEntity(this.recharge, `${this.service}-recharge`, user);
    }
}

export interface SendShoppingResponse {
    success: boolean;
    operationId: any;
    errorMessage: string;
    shoppings: Shopping[];
    agent: User;
}

export class SendShoppingResponseEntity implements SendShoppingResponse {
    agent: User;
    errorMessage: string;
    operationId: any;
    shoppings: Shopping[];
    success: boolean;

    constructor(attributes: any, user: User) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this[key] = attributes[key];
            }
        }

        this.shoppings.forEach((sh: Shopping, key: number) => {
            this.shoppings[key] = new ShoppingResponseEntity(sh, user);
        });
    }

}
