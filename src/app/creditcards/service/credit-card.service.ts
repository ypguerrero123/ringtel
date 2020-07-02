import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Utils} from '../../shared/utils/utils';
import {Subject} from 'rxjs';
import {Charge, Method} from '../../shared/model/stripe';
import {Messages} from '../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class CreditCardService {

    //-------------CREDITCARD VARS-----------------------//
    public savedPaymentMethods: Subject<Method[]> = new Subject<Method[]>();
    public customerCharges: Subject<Charge[]> = new Subject<Charge[]>();

    constructor(public appService: AppService) {
    }

    /**
     * @method getAllPaymentMethods
     */
    public async getAllPaymentMethods() {
        this.appService.post(
            `es/api/v1/stripe/${this.appService.userType()}/${this.appService.user.id}/all-payment-methods`
        ).subscribe(
            (resp: any) => {
                this.savedPaymentMethods.next(Utils.parseMethods(resp.methods));
            },
            () => {
                this.savedPaymentMethods.next([]);
            });
    }

    /**
     * @method getAllCustomerCharges
     */
    public async getAllCustomerCharges() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.user.id}/customer-charges-transactions`
            ).subscribe(
                (resp: any) => {
                    this.customerCharges.next(resp.transactions);
                },
                () => {
                    this.customerCharges.next([]);
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method detachPaymentMethod
     * @param paymentId
     */
    public async detachPaymentMethod(paymentId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.user.id}/detach/${paymentId}/payment-method`
            ).subscribe(
                (resp: any) => {
                    this.savedPaymentMethods.next(Utils.parseMethods(resp.methods));
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
}
