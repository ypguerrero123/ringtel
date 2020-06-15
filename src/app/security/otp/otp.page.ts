import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';
import {IonInput, Platform} from '@ionic/angular';
import {Utils} from '../../services/utils/utils';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.page.html',
    styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

    /**
     * @var FormGroup
     */
    public otpForm: FormGroup;

    /**
     * @var FormGroup
     */
    public phoneForm: FormGroup;

    /**
     * @var number
     */
    public countdown: number = 30;
    /**
     * @var bool
     */
    public changePhoneNumber: boolean = false;

    /**
     * Constructor OtpPage
     * @param appService
     * @param formBuilder
     * @param platform
     */
    constructor(public appService: AppService,
                private formBuilder: FormBuilder,
                private platform: Platform
    ) {
    }

    /**
     * @method phoneFormControl
     */
    public get phoneFormControl() {
        return this.phoneForm.controls;
    }

    ngOnInit() {
        this.appService.profvars.updateCCodePhoneValue(this.appService.secvars.user.phoneCodeNumber);
        this.phoneForm = this.formBuilder.group({
            phone: [Utils.strFixPhoneNumber(this.appService.secvars.user.phone),
                [Validators.required, Validators.pattern('[0-9]+')]
            ]
        });
        this.otpForm = this.formBuilder.group({
            one: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
            two: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
            three: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
            four: ['', [Validators.required, Validators.pattern('[0-9]{1}')]]
        });
        this.countDown();
    }

    /**
     * @method onSubmitVerifyOTP
     * @param timeWait
     */
    public async onSubmitVerifyOTP(timeWait = 0) {

        setTimeout(() => {

            if (this.otpForm.valid) {
                return this.appService.verifyOTP(
                    `${this.otpFormValue().one}${this.otpFormValue().two}${this.otpFormValue().three}${this.otpFormValue().four}`
                ).then();
            }
            return this.appService.presentToast(Messages.FORM_NOT_VALID).then();

        }, timeWait);


    }

    /**
     * @method repeatOTP
     */
    public async repeatOTP(editPhone: boolean = false) {
        if (this.phoneForm.valid) {
            await this.appService.repeatOTP(
                editPhone ? Utils.getFormData({
                    'phone': this.phoneForm.value.phone,
                    'phone_code': this.appService.secvars.user.phoneCodeNumber
                }) : {}
            );
            return this.selectChangePhoneNumber(false);
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

    public goToNexInput(next: IonInput) {
        next.setFocus().then();
    }

    /**
     * @method selectChangePhoneNumber
     * @param select
     */
    public selectChangePhoneNumber(select: boolean = true) {
        this.changePhoneNumber = select;
    }

    /**
     * @method countDown
     */
    private countDown() {
        setInterval(() => {
            if (this.countdown == 0) {
                return;
            }

            this.countdown = --this.countdown;

        }, 1000);
    }

    /**
     * @method otpFormValue
     */
    private otpFormValue() {
        return this.otpForm.value;
    }

}
