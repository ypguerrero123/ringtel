import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {RecoveryService} from '../service/recovery.service';

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
     * Constructor
     * @param formBuilder
     * @param recoveryService
     */
    constructor(private formBuilder: FormBuilder, public recoveryService: RecoveryService) {
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
            return await this.recoveryService.recovery(this.recoveryForm.value);
        }
        return this.recoveryService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
