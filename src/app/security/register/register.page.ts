import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {Utils} from '../../services/utils/utils';
import {Messages} from '../../config/messages';

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
     * Constructor RegisterPage
     * @param formBuilder
     * @param appService
     */
    constructor(private formBuilder: FormBuilder, public appService: AppService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['Nombre Apellidos', [Validators.required, Validators.minLength(2)]],
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
            return await this.appService.register(
                Utils.getFormData(this.registerForm.value, {'phone_code': this.appService.profvars.ccodePhoneValue})
            );
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

}
