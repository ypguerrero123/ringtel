import {User} from './user';
import {Constants} from '../config/constants';
import {Messages} from '../config/messages';

export interface Recharge {
    id: number;
    code: string;
    amount: number;
    salePrice: any;
    sellingCost: any;
    slug: string;
    enabled: any;
}

export class RechargeEntity implements Recharge {
    amount: number;
    code: string;
    id: number;
    slug: string;
    salePrice: any;
    sellingCost: any;
    enabled: any;

    constructor(attributes: any, slug, user: User) {
        for (let key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this[key] = attributes[key];
            }
        }
        this.slug = `${this.amount} CUC`;
    }
}

