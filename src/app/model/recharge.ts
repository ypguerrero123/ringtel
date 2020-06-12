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
        if (user.broker_post_sale) {
            switch (slug) {
                case Constants.NAUTA_SLUG:
                case Messages.NAUTA_LOWER:
                    if (user.sale_price_nauta) {
                        this.slug = `$${user.sale_price_nauta} = ${this.amount} CUC`;
                    }
                    break;
                case Constants.CUBACEL_SLUG:
                case Messages.CUBACEl_LOWER:
                    if (user.sale_price_cubacel) {
                        this.slug = `$${user.sale_price_cubacel} = ${this.amount} CUC`;
                    }
                    break;
            }
        }
    }
}

