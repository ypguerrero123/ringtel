import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {Messages} from '../../../config/messages';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {Constants} from '../../../config/constants';
import {ContactInterface} from '../../../model/contact';

@Component({
    selector: 'app-long-distance-container',
    templateUrl: './long-distance-container.component.html',
    styleUrls: ['./long-distance-container.component.scss'],
})
export class LongDistanceContainerComponent implements OnInit {

    /**
     * @var FormGroup
     */
    public longForm: FormGroup;
    /**
     * @var string
     */
    public phoneByContactName: string = '';
    /**
     * @var ContactInterface[]
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
     * Constructor LongDistanceContainerComponent
     * @param appService
     * @param platform
     * @param formBuilder
     * @param callNumber
     */
    constructor(public appService: AppService,
                private platform: Platform,
                private formBuilder: FormBuilder,
                private callNumber: CallNumber
    ) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.longForm.controls;
    }

    ngOnInit() {
        this.longForm = this.formBuilder.group({
            client: ['', [Validators.minLength(2)]],
            account: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(8)]],
            recharge: ['', [Validators.required]],
        });
        this.appService.getAllRechargesByServiceSlug(Constants.LONG_DISTANCE_SLUG).then();

        this.appService.contactsList(this.contactsName).then();

        this.filteredNames = this.longForm.get('client').valueChanges
            .pipe(
                startWith(''),
                map(value => this.appService.filterContactName(this.contactsName, value))
            );
    }

    /**
     * @method onSubmitVerifyOTP
     */
    public async onSubmit() {
        if (this.longForm.valid) {
            return this.appService.confirmShoppingData(this.longForm, this.action, Messages.LONG_DISTANCE_LOWER).then();
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
                this.phoneByContactName = (contact[0].phone).slice(-10);
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

    /**
     * @method callCenter
     */
    public async callCenter() {
        const isMobilWeb = await this.appService.getStorage(Constants.IS_MOBIL_WEB, false);
        if (!isMobilWeb) {
            this.callNumber.callNumber('+13058309700', true).then().catch();
        }
    }

}
