import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.page.html',
    styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

    /**
     * @var FormGroup
     */
    public recoveryForm: FormGroup;

    /**
     * Constructor RecoveryPage
     * @param formBuilder
     * @param appService
     */
    constructor(private formBuilder: FormBuilder, public appService: AppService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.recoveryForm.controls;
    }

    ngOnInit() {
        this.recoveryForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.recoveryForm.valid) {
            return await this.appService.recovery(this.recoveryForm.value);
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

}
