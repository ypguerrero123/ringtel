import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, LoadingController} from '@ionic/angular';
import {MatStepper} from '@angular/material';
import {AppService} from '../services/app.service';
import {Utils} from '../services/utils/utils';
import {Messages} from '../config/messages';
import {Method} from '../model/stripe';
import {environment} from '../../environments/environment';
import {AppRoutes} from '../config/routes';

declare var Stripe;

@Component({
    selector: 'app-stripe',
    templateUrl: './stripe.page.html',
    styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

    @ViewChild('stepper', {static: false}) stepper: MatStepper;
    /**
     * @var string
     */
    public selectBrand: string = 'other';
    /**
     * @var boolean
     */
    public selectCardNumber: boolean = false;
    /**
     * @var number
     */
    public selectCardPrice: number = 100;
    /**
     * @var string
     */
    public selectCardName: string = '';
    /**
     * Only form (amount, confirm data, radio saved methods)
     */
    public amountAcceptCardForm: FormGroup;
    /**
     * Check if StripeService or Saved Payment Methods form are invalid
     */
    public invalidFormNewPaymentMethod: boolean = true;
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
     * @var string
     */
    public errorTransaction: string = null;
    /**
     * @var string[]
     */
    private validBrands: string[] = ['amex', 'visa', 'mastercard', 'discover', 'jcb', 'diners'];
    /**
     * Saved Payment Methods
     */
    private savedPaymentMethods: Method[] = [];
    /**
     * StripeService vars
     */
    private pkSecret: string = environment.stripeKey;
    private stripe = Stripe(this.pkSecret, {
        locale: 'es'
    });
    private card: any;

    /**
     *
     * @param appService
     * @param formBuilder
     * @param loadingController
     * @param actionSheetController
     */
    constructor(public appService: AppService,
                private formBuilder: FormBuilder,
                private loadingController: LoadingController,
                public actionSheetController: ActionSheetController
    ) {

    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.amountAcceptCardForm.controls;
    }

    ngOnInit() {
        this.appService.stvars.savedPaymentMethods.subscribe({
            next: (savedPaymentMethods: Method[]) => {
                this.savedPaymentMethods = savedPaymentMethods;
                this.showSavedPaymentMethods = this.savedPaymentMethods.length > 0;
            }
        });
        this.amountAcceptCardForm = this.formBuilder.group({
            name: ['', [
                Validators.required,
                Validators.minLength(2)]
            ],
            amount: [100, [
                Validators.required,
                Validators.min(10),
                Validators.max(2000),
                Validators.pattern('[0-9.]+')]
            ],
            accept: [false, [Validators.requiredTrue]],
        });
        /* list All Payments Method */
        this.appService.getAllPaymentMethods().then();

        /** init New Form StripeService */
        this.showNewPaymentMethod();
    }

    /**
     * @method selectNewPaymentMethod
     */
    public selectNewPaymentMethod() {
        this.invalidFormNewPaymentMethod = true;
        this.oldSelectedMethod = null;

        this.showNewPaymentMethod();
    }

    /**
     * @method showOldPaymentMethod
     */
    public async showOldPaymentMethod() {

        const buttons: any[] = [];
        this.savedPaymentMethods.forEach((method: Method) => {
            let button = {
                text: `**** ${method.card.last4}  ${method.card.exp_month}/${method.card.exp_year}  ${method.card.brand.toUpperCase()}`,
                icon: 'card-outline',
                backdropDismiss: false,
                keyboardClose: false,
                handler: () => {
                    this.selectOldPeymentMethod(method);
                }
            };
            buttons.push(button);
        });

        let closeButton = {
            text: Messages.PAY_WITH_NEW_CREDIT_CARD,
            icon: 'close-circle-outline',
            role: 'cancel',
            handler: () => {
            }
        };
        buttons.push(closeButton);

        const actionSheet = await this.actionSheetController.create({
            header: Messages.MY_CREDIT_CARDS,
            buttons: buttons
        });

        await actionSheet.present();
    }

    /**
     * @method amountFormFocus
     * @param focusIn
     */
    public amountFormFocus(focusIn: boolean = true) {
        this.amountFocusIn = focusIn;
    }

    /**
     * @method onSubmit
     */
    public onSubmit() {
        this.errorTransaction = null;
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            let paymentMethodData = this.getPaymentMethod();

            let amount = this.amountAcceptCardForm.value.amount ? this.amountAcceptCardForm.value.amount : 10;
            if (!amount || amount < 10) {
                return this.appService.presentToast(Messages.FORM_NOT_VALID);
            }

            const data = this.oldSelectedMethod ? Utils.getFormData({'payment_method': this.oldSelectedMethod.id}) : {};

            this.appService.post(
                `es/api/v1/stripe/${this.appService.userType()}/${this.appService.secvars.user.id}/credit/${amount}/payment-intent`, data
            ).subscribe(
                (resp: any) => {
                    this.stripe.confirmCardPayment(resp.client_secret, paymentMethodData).then((result) => {
                        this.appService.dismissLoading(loading).then(() => {

                            if (result.error) {
                                // Show error to your customer
                                this.errorTransaction = result.error.message;
                            } else {
                                if (result.paymentIntent.status === 'succeeded') {
                                    this.appService.updateAgentBalance().then(() => {
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
     * @method getPaymentMethod
     */
    private getPaymentMethod() {
        if (this.oldSelectedMethod) {
            return {
                payment_method: this.oldSelectedMethod.id
            };
        }
        return {
            payment_method: {
                card: this.card,
                billing_details: {
                    name: this.amountAcceptCardForm.value.name,
                    email: this.appService.secvars.user.email,
                    phone: this.appService.secvars.user.phone
                }
            },
            setup_future_usage: 'off_session'
        };
    }

    /**
     * @method selectOldPeymentMethod
     * @param method
     */
    private selectOldPeymentMethod(method: Method) {
        this.invalidFormNewPaymentMethod = false;
        this.oldSelectedMethod = method;
        this.selectCardName = method.billing_details.name;

        this.card.unmount();
    }

    /**
     * @method showNewPaymentMethod
     */
    private showNewPaymentMethod() {
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
                this.getBrand(event.brand, event.empty);
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
     * @method getBrand
     * @param value
     * @param empty
     */
    private getBrand(value: string, empty: boolean) {
        this.selectBrand = this.validBrands.includes(value) ? value : 'other';
        this.selectCardNumber = !empty;
    }

}
