import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {LoginService} from '../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    /**
     * @var FormGroup
     */
    public loginForm: FormGroup;

    /**
     * Constructor
     * @param formBuilder
     * @param loginService
     */
    constructor(private formBuilder: FormBuilder, public loginService: LoginService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.loginForm.valid) {
            return await this.loginService.login(JSON.stringify(this.loginForm.value));
        }
        return this.loginService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
