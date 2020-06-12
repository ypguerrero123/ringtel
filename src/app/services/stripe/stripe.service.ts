import {AppService} from '../app.service';
import {User} from '../../model/user';
import {Messages} from '../../config/messages';
import {Utils} from '../utils/utils';

/**
 * StripeService
 */
export class StripeService {

    /**
     * Constructor StripeService
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method updateAgentBalance
     */
    public async updateAgentBalance() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/payment-intent-status`)
                .subscribe(
                    (resp: User) => {
                        this.appService.setUser(resp).then();
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
     * @method getAllPaymentMethods
     */
    public async getAllPaymentMethods() {
        this.appService.post(
            `es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/all-payment-methods`
        ).subscribe(
            (resp: any) => {
                this.appService.stvars.updateOldPaymentMethods(Utils.parseMethods(resp.methods));
            },
            () => {
                this.appService.stvars.updateOldPaymentMethods([]);
            },
            () => {
            });
    }

    /**
     * @method detachPaymentMethod
     * @param paymentId
     */
    public async detachPaymentMethod(paymentId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/detach/${paymentId}/payment-method`
            ).subscribe(
                (resp: any) => {
                    this.appService.stvars.updateOldPaymentMethods(Utils.parseMethods(resp.methods));
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
     * @method getAllCustomerCharges
     */
    public async getAllCustomerCharges() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/customer-charges-transactions`
            ).subscribe(
                (resp: any) => {
                    this.appService.stvars.updateCustomerCharges(resp.transactions);
                },
                () => {
                    this.appService.stvars.updateCustomerCharges([]);
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method createPaymentIntentv
     * @param amount
     * @param data
     */
    public async createPaymentIntent(amount, data = {}) {
        this.appService.post(
            `es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/credit/${amount}/payment-intent`, data
        ).subscribe(
            (resp: any) => {
                this.appService.stvars.clientSecret = resp.client_secret;
            },
            () => {
                this.appService.stvars.clientSecret = null;

            }, () => {

            });
    }

}
