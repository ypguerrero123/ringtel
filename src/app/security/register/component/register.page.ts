import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';
import {RegisterService} from '../service/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    /**
     * @var FormGroup
     */
    public registerForm: FormGroup;

    /**
     * Constructor
     * @param formBuilder
     * @param registerService
     */
    constructor(private formBuilder: FormBuilder, public registerService: RegisterService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    /**
     * @method onSubmitVerifyOTP
     */
    public async onSubmit() {
        if (this.registerForm.valid) {
            return await this.registerService.register(
                Utils.getFormData(this.registerForm.value, {'phone_code': this.registerService.appService.ccodePhoneValue})
            );
        }
        return this.registerService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
