import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {LoginService} from '../service/login.service';
import {FingerPrintService} from '../../../fingerprint/service/finger-print.service';
import {Constants} from '../../../shared/config/constants';

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
     * @var int
     */
    public fullYear: number = new Date().getFullYear();
    private _action = 1;

    /**
     * Constructor
     * @param formBuilder
     * @param loginService
     * @param fingerPrintService
     */
    constructor(private formBuilder: FormBuilder, public loginService: LoginService, public fingerPrintService: FingerPrintService) {
    }

    ngOnInit() {

        this.fingerPrintService.userHasConfigutared().then();

        this.fingerPrintService.successFinger.subscribe(async (result) => {

            const fingerData: any = await this.fingerPrintService.appService.getStorage(Constants.DATA_FINGER_PRINT);

            if (fingerData && fingerData.username != null && fingerData.password != null) {
                return this.loginService.login(JSON.stringify(fingerData)).then();
            }

            return this.fingerPrintService.appService.presentToast(Messages.APP_FINGET_NO_CONFIGURATED).then();

        });

        this.fingerPrintService.errorFinger.subscribe(() => {
            this.fingerPrintService.appService.presentToast(!this.fingerPrintService.isFingerAvailable ? Messages.APP_FINGET_NO_PERMITED : Messages.APP_FINGET_NO_CONFIGURATED).then();
        });

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
            return this.loginService.login(JSON.stringify(this.loginForm.value)).then();
        }
        return this.loginService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

    /**
     * @method Get
     */
    public get action(): number {
        return this._action;
    }

    /**
     * @method Set
     * @param value
     */
    public set action(value: number) {
        this._action = value;
    }
}
