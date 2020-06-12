import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {Utils} from '../../services/utils/utils';
import {Validations} from '../../config/validations';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-password',
    templateUrl: './password.page.html',
    styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

    /**
     * @var FormGroup
     */
    public passwordForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public appService: AppService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.passwordForm.controls;
    }

    /**
     * @method phoneFormControl
     */
    public get formErrors() {
        return this.passwordForm.errors;
    }

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', []]
        }, {validator: Validations.checkPasswords});
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.passwordForm.valid) {
            return await this.appService.updateProfile('password', Utils.getFormData(this.passwordForm.value));
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

}
