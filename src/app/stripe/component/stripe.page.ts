import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController} from '@ionic/angular';
import {Messages} from '../../shared/config/messages';
import {Method} from '../../shared/model/stripe';
import {StripeService} from '../service/stripe.service';


@Component({
    selector: 'app-stripe',
    templateUrl: './stripe.page.html',
    styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

    /**
     * Only form (amount, confirm data, radio saved methods)
     */
    public amountAcceptCardForm: FormGroup;
    /**
     * Saved Payment Methods
     */
    private savedPaymentMethods: Method[] = [];

    /**
     * Constructor
     * @param formBuilder
     * @param actionSheetController
     * @param stripeService
     */
    constructor(private formBuilder: FormBuilder,
                private actionSheetController: ActionSheetController,
                public stripeService: StripeService
    ) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.amountAcceptCardForm.controls;
    }

    ngOnInit() {
        this.stripeService.savedPaymentMethods.subscribe({
            next: (savedPaymentMethods: Method[]) => {
                this.savedPaymentMethods = savedPaymentMethods;
                this.stripeService.showSavedPaymentMethods = this.savedPaymentMethods.length > 0;
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
        this.stripeService.getAllPaymentMethods().then();

        /** init New Form StripeService */
        this.stripeService.showNewPaymentMethod();
    }

    /**
     * @method selectNewPaymentMethod
     */
    public selectNewPaymentMethod() {
        this.stripeService.oldSelectedMethod = null;
        this.stripeService.invalidFormNewPaymentMethod = true;
        this.stripeService.showNewPaymentMethod();
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

                    this.stripeService.invalidFormNewPaymentMethod = false;
                    this.stripeService.oldSelectedMethod = method;
                    this.stripeService.selectCardName = method.billing_details.name;
                    this.stripeService.card.unmount();

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
        this.stripeService.amountFocusIn = focusIn;
    }

    /**
     * @method onSubmit
     */
    public onSubmit() {
        this.stripeService.payStripe(this.amountAcceptCardForm.value.name, this.amountAcceptCardForm.value.amount).then();
    }


}
