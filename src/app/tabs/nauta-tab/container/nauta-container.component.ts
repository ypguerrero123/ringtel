import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../services/app.service';
import {Messages} from '../../../config/messages';
import {Validations} from '../../../config/validations';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Constants} from '../../../config/constants';
import {ContactInterface} from '../../../model/contact';
import {FileValidator} from 'ngx-material-file-input';

@Component({
    selector: 'app-nauta-container',
    templateUrl: './nauta-container.component.html',
    styleUrls: ['./nauta-container.component.scss'],
})
export class NautaContainerComponent implements OnInit {

    /**
     * @var FormGroup
     */
    public nautaForm: FormGroup;
    public nautaFormFile: FormGroup;

    /**
     * In this example, it's 100 MB (=100 * 2 ** 20).
     */
    readonly maxSizeFile = 104857600;
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
    public action: number = 1;

    /**
     * Constructor NautaContainerComponent
     * @param appService
     * @param formBuilder
     */
    constructor(public appService: AppService,
                private formBuilder: FormBuilder
    ) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.nautaForm.controls;
    }

    /**
     * @method formControlFile
     */
    public get formControlFile() {
        return this.nautaFormFile.controls;
    }

    ngOnInit() {
        this.nautaForm = this.formBuilder.group({
            client: ['', [Validators.minLength(2)]],
            account: ['', [Validators.required, Validators.minLength(2), Validations.emailDomainValidator]],
            recharge: ['', [Validators.required]],
        });
        this.nautaFormFile = this.formBuilder.group({
            inputFile: ['', [
                Validators.required,
                FileValidator.maxContentSize(this.maxSizeFile),
                Validations.fileExtensionValidator('txt,csv')]
            ],
            recharge: ['', [Validators.required]],
        });
        this.appService.getAllRechargesByServiceSlug(Constants.NAUTA_SLUG).then();
        this.appService.contactsList(this.contactsName).then();

        this.filteredNames = this.nautaForm.get('client').valueChanges
            .pipe(
                startWith(''),
                map(value => this.appService.filterContactName(this.contactsName, value))
            );

    }

    /**
     * @method onSubmitVerifyOTP
     */
    public async onSubmit() {
        if (this.nautaForm.valid) {
            return this.appService.confirmShoppingData(this.nautaForm, this.action, Messages.NAUTA_LOWER).then();
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

    /**
     * @method onSubmitFile
     */
    public async onSubmitFile() {
        if (this.nautaFormFile.valid) {
            return this.appService.confirmShoppingDataFile(this.nautaFormFile, this.action, Messages.NAUTA_LOWER).then();
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
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
