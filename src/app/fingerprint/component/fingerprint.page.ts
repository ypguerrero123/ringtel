import {Component, OnInit} from '@angular/core';
import {FingerPrintService} from '../service/finger-print.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../shared/config/messages';
import {Utils} from '../../shared/utils/utils';

@Component({
    selector: 'app-fingerprint',
    templateUrl: './fingerprint.page.html',
    styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage implements OnInit {

    /**
     * @var FormGroup
     */
    public fingerForm: FormGroup;

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.fingerForm.controls;
    }

    /**
     * Constructor
     * @param formBuilder
     * @param fingerPrintService
     */
    constructor(private formBuilder: FormBuilder, public fingerPrintService: FingerPrintService) {
    }

    ngOnInit() {

        this.fingerPrintService.userHasConfigutared().then();

        this.fingerForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            enabled: [this.fingerPrintService.appService.user.enabledFingerPrint, []],
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.fingerForm.valid) {
            return this.fingerPrintService.configureFingerPrint(Utils.getFormData(this.fingerForm.value)).then();
        }
        return this.fingerPrintService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
