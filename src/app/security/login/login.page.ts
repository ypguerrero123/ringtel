import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {Messages} from "../../config/messages";

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
     * Contructor LoginPage
     * @param formBuilder
     * @param appService
     */
    constructor(private formBuilder: FormBuilder, public appService: AppService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.loginForm.valid) {
            return await this.appService.login(JSON.stringify(this.loginForm.value));
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

}
