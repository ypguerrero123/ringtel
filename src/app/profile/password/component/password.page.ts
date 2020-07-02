import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../shared/utils/utils';
import {Validations} from '../../../shared/config/validations';
import {Messages} from '../../../shared/config/messages';
import {ProfilePasswordService} from '../service/profile-password.service';

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

    /**
     * Constructor
     * @param formBuilder
     * @param profilePasswordService
     */
    constructor(private formBuilder: FormBuilder, public profilePasswordService: ProfilePasswordService) {
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
            return await this.profilePasswordService.updatePassword('password', Utils.getFormData(this.passwordForm.value));
        }
        return this.profilePasswordService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
