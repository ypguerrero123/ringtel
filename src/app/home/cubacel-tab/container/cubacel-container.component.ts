import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ContactInterface} from '../../../shared/model/contact';
import {Validations} from '../../../shared/config/validations';
import {RechargeService} from '../../service/recharge.service';
import {Constants} from '../../../shared/config/constants';
import {Chooser} from '@ionic-native/chooser/ngx';
import {IonInput} from '@ionic/angular';

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
    public cubacelFormFile: FormGroup;

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
    public action: number = 1;
    /**
     * @var File
     */
    private file: File;

    /**
     * Constructor
     * @param formBuilder
     * @param chooser
     * @param rechargeService
     */
    constructor(private formBuilder: FormBuilder, private chooser: Chooser, public rechargeService: RechargeService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.cubacelForm.controls;
    }

    /**
     * @method formControlFile
     */
    public get formControlFile() {
        return this.cubacelFormFile.controls;
    }

    ngOnInit() {
        this.cubacelForm = this.formBuilder.group({
            client: ['', [Validators.minLength(2)]],
            account: ['', [Validators.required, Validators.pattern('[5]{1}[0-9]{7}')]],
            recharge: ['', [Validators.required]],
        });
        this.cubacelFormFile = this.formBuilder.group({
            inputFile: ['', [
                Validators.required,
                Validations.fileExtensionValidator('txt,csv')]
            ],
            recharge: ['', [Validators.required]],
        });

        this.rechargeService.getAllRechargesByServiceSlug(Constants.CUBACEL_SLUG).then();
        this.rechargeService.verifyPreSaleActive().then();

        this.rechargeService.appService.contactsList(this.contactsName).then();
        this.filteredNames = this.cubacelForm.get('client').valueChanges
            .pipe(
                startWith(''),
                map(value => this.rechargeService.appService.filterContactName(this.contactsName, value))
            );
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if ((this.rechargeService.allSalesActive && this.rechargeService.appService.isPostSale()) || (!this.rechargeService.appService.isPostSale())) {
            if (this.cubacelForm.valid) {
                return this.rechargeService.confirmShoppingData(this.cubacelForm, this.action, Messages.CUBACEl_LOWER).then();
            }
            return this.rechargeService.appService.presentToast(Messages.FORM_NOT_VALID).then();
        }
    }

    /**
     * @method onSubmitFile
     */
    public async onSubmitFile() {
        if ((this.rechargeService.allSalesActive && this.rechargeService.appService.isPostSale()) || (!this.rechargeService.appService.isPostSale())) {
            if (this.cubacelFormFile.valid && this.file) {
                return this.rechargeService.confirmShoppingDataFile(this.file, this.cubacelFormFile.value.recharge, this.action, Messages.CUBACEl_LOWER).then();
            }
            return this.rechargeService.appService.presentToast(Messages.FORM_NOT_VALID).then();
        }
    }

    /**
     * @method optionSelected
     * @param name
     */
    public async optionSelected(name) {
        this.rechargeService.appService.optionSelected(this.contactsName, name).then((contact: ContactInterface[]) => {
            if (contact) {
                this.phoneByContactName = (contact[0].phone).slice(-8);
                this.formControl.account.markAsDirty();
            }
        });
    }

    /**
     * @method chooserFile
     * @param $event
     */
    public async chooserFile($event: CustomEvent) {
        this.file = $event.target['firstChild'].files[0];
        if (this.file) {
            this.cubacelFormFile.setValue({
                inputFile: this.file.name,
                recharge: this.cubacelFormFile.value.recharge
            });
            this.formControlFile.inputFile.markAsDirty();
        }
    }

    /**
     * @method activeEventGetFile
     * @param inputHiddenFile
     */
    public activeEventGetFile(inputHiddenFile: IonInput) {
        inputHiddenFile.getInputElement().then((input: HTMLInputElement) => {
            input.click();
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
