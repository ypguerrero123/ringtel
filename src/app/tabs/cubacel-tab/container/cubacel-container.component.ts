import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {Messages} from '../../../config/messages';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Constants} from '../../../config/constants';
import {ContactInterface} from '../../../model/contact';

@Component({
    selector: 'app-cubacel-container',
    templateUrl: './cubacel-container.component.html',
    styleUrls: ['./cubacel-container.component.scss'],
})
export class CubacelContainerComponent implements OnInit {
    /**
     * @var FormGroup
     */
    public cubacelForm: FormGroup;
    /**
     * @var string
     */
    public phoneByContactName: string = '';
    /**
     * @var Contact[]
     */
    public contactsName: ContactInterface[] = [];
    /**
     * @var Observable
     */
    public filteredNames: Observable<ContactInterface[]>;
    /**
     * @var string
     */
    public buttonSubmitText: string = Messages.RECHARGE_NOW;
    /**
     * @var number
     */
    private action: number = 1;

    /**
     * Constructor CubacelContainerComponent
     * @param appService
     * @param formBuilder
     */
    constructor(public appService: AppService, private formBuilder: FormBuilder) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.cubacelForm.controls;
    }

    ngOnInit() {
        this.cubacelForm = this.formBuilder.group({
            client: ['', [Validators.minLength(2)]],
            account: ['', [Validators.required, Validators.pattern('[5]{1}[0-9]{7}')]],
            recharge: ['', [Validators.required]],
        });
        this.appService.getAllRechargesByServiceSlug(Constants.CUBACEL_SLUG).then();
        this.appService.contactsList(this.contactsName).then();

        this.filteredNames = this.cubacelForm.get('client').valueChanges
            .pipe(
                startWith(''),
                map(value => this.appService.filterContactName(this.contactsName, value))
            );
    }

    /**
     * @method onSubmitVerifyOTP
     */
    public async onSubmit() {
        if (this.cubacelForm.valid) {
            return this.appService.confirmShoppingData(this.cubacelForm, this.action, Messages.CUBACEl_LOWER).then();
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

    /**
     * @method optionSelected
     * @param name
     */
    public async optionSelected(name) {
        this.appService.optionSelected(this.contactsName, name).then((contact: ContactInterface[]) => {
            if (contact) {
                this.phoneByContactName = (contact[0].phone).slice(-8);
                this.formControl.account.markAsDirty();
            }
        });
    }

    /**
     * @method setAction
     * @param value
     */
    public setAction(value: number) {
        this.action = value;

        switch (value) {
            case 3:
                this.buttonSubmitText = Messages.RECHARGE_IN_PROMOTION;
                break;
            case 2:
                this.buttonSubmitText = Messages.SEND_TO_SHOPPING_CART;
                break;
            default:
                this.buttonSubmitText = Messages.RECHARGE_NOW;
                break;
        }
    }

}
