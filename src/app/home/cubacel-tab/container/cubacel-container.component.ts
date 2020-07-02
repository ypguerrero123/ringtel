import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ContactInterface} from '../../../shared/model/contact';
import {FileValidator} from 'ngx-material-file-input';
import {Validations} from '../../../shared/config/validations';
import {RechargeService} from '../../service/recharge.service';
import {Constants} from '../../../shared/config/constants';

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
     * In this example, it's 100 MB (=100 * 2 ** 20).
     */
    readonly maxSizeFile = 104857600;
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
     * Constructor
     * @param formBuilder
     * @param rechargeService
     */
    constructor(private formBuilder: FormBuilder, public rechargeService: RechargeService) {
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
                FileValidator.maxContentSize(this.maxSizeFile),
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
        if (this.cubacelForm.valid) {
            return this.rechargeService.confirmShoppingData(this.cubacelForm, this.action, Messages.CUBACEl_LOWER).then();
        }
        return this.rechargeService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

    /**
     * @method onSubmitFile
     */
    public async onSubmitFile() {
        if (this.cubacelFormFile.valid) {
            return this.rechargeService.confirmShoppingDataFile(this.cubacelFormFile, this.action, Messages.CUBACEl_LOWER).then();
        }
        return this.rechargeService.appService.presentToast(Messages.FORM_NOT_VALID).then();
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
