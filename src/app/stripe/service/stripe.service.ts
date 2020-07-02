import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Subject} from 'rxjs';
import {Method} from '../../shared/model/stripe';
import {Utils} from '../../shared/utils/utils';
import {User} from '../../shared/model/user';
import {Messages} from '../../shared/config/messages';
import {AppRoutes} from '../../shared/config/routes';
import {environment} from '../../../environments/environment';

declare var Stripe;

@Injectable({
    providedIn: 'root'
})
export class StripeService {

    //-------------STRIPE VARS-----------------------//
    public savedPaymentMethods: Subject<Method[]> = new Subject<Method[]>();
    /**
     * StripeService vars
     */
    private pkSecret: string = environment.stripeKey;
    public stripe = Stripe(this.pkSecret, {
        locale: 'es'
    });
    /**
     * @var any
     */
    public card: any;
    /**
     * @var string
     */
    public selectBrand: string = 'other';
    /**
     * @var string[]
     */
    public validBrands: string[] = ['amex', 'visa', 'mastercard', 'discover', 'jcb', 'diners'];
    /**
     * @var boolean
     */
    public selectCardNumber: boolean = false;
    /**
     * @var string
     */
    public errorTransaction: string = null;
    /**
     * Check if StripeService or Saved Payment Methods form are invalid
     */
    public invalidFormNewPaymentMethod: boolean = true;
    /**
     * @var number
     */
    public selectCardPrice: number = 100;
    /**
     * @var string
     */
    public selectCardName: string = '';
    /**
     * Show saved form methods
     */
    public showSavedPaymentMethods: boolean = false;
    /**
     * Check if amount form is in (focusin)
     */
    public amountFocusIn: boolean = false;
    /**
     * Old Selected Method
     */
    public oldSelectedMethod: Method = null;

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method payStripe
     * @param clientName
     * @param amount
     */
    public async payStripe(clientName, amount) {

        const paymentMethodData = this.getPaymentMethod(clientName);

        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.errorTransaction = null;

            amount = amount ? amount : 10;
            if (!amount || amount < 10) {
                return this.appService.presentToast(Messages.FORM_NOT_VALID);
            }

            const data = this.oldSelectedMethod ? Utils.getFormData({'payment_method': this.oldSelectedMethod.id}) : {};

            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.user.id}/credit/${amount}/payment-intent`, data
            ).subscribe(
                (resp: any) => {
                    this.stripe.confirmCardPayment(resp.client_secret, paymentMethodData).then((result) => {
                        this.appService.dismissLoading(loading).then(() => {

                            if (result.error) {
                                // Show error to your customer
                                this.errorTransaction = result.error.message;
                            } else {
                                if (result.paymentIntent.status === 'succeeded') {
                                    this.updateAgentBalance().then(() => {
                                        this.appService.navigateToUrl(AppRoutes.APP_SUCCESS);
                                    });
                                }
                            }

                        });
                    });
                },
                () => {
                    return this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER);
                });
        });
    }

    /**
     * @method updateAgentBalance
     */
    public async updateAgentBalance() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/stripe/${this.appService.userType()}/${this.appService.user.id}/payment-intent-status`
            ).subscribe(
                (resp: User) => {
                    this.appService.setUser(resp).then();
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
     * @method showNewPaymentMethod
     */
    public showNewPaymentMethod() {
        setTimeout(() => {
            let elements = this.stripe.elements({
                locale: 'es',
            });

            this.card = elements.create('card', {
                iconStyle: 'solid',
                style: {
                    invalid: {
                        iconColor: 'darkred',
                        color: 'darkred',
                        ':focus': {
                            color: '#303238',
                        },
                    },
                }
            });
            this.card.mount('#card-element');

            this.card.focus();

            this.card.addEventListener('change', (event) => {

                this.selectBrand = this.validBrands.includes(event.brand) ? event.brand : 'other';
                this.selectCardNumber = !event.empty;

                let displayError = document.getElementById('card-errors');

                if (event.error) {

                    this.invalidFormNewPaymentMethod = true;
                    displayError.textContent = event.error.message;

                } else if (event.complete) {

                    this.invalidFormNewPaymentMethod = false;
                    displayError.textContent = '';

                }
            }, {passive: true});

        }, 100);
    }

    /**
     * @method getPaymentMethod
     * @param clientName
     */
    private getPaymentMethod(clientName) {
        if (this.oldSelectedMethod) {
            return {
                payment_method: this.oldSelectedMethod.id
            };
        }
        return {
            payment_method: {
                card: this.card,
                billing_details: {
                    name: clientName,
                    email: this.appService.user.email,
                    phone: this.appService.user.phone
                }
            },
            setup_future_usage: 'off_session'
        };
    }
}
