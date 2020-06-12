import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../services/utils/utils";
import {Messages} from "../../config/messages";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    /**
     * @var FormGroup
     */
    public profileForm: FormGroup;


    /**
     * Constructor ProfilePage
     * @param appService
     * @param formBuilder
     */
    constructor(public appService: AppService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {

        this.appService.profvars.updateCCodePhoneValue(this.appService.secvars.user.phoneCodeNumber);

        this.profileForm = this.formBuilder.group({
            name: [this.appService.secvars.user.name,
                [Validators.required, Validators.minLength(2)]
            ],
            email: [this.appService.secvars.user.email,
                [Validators.required, Validators.email]
            ],
            phone: [Utils.strFixPhoneNumber(this.appService.secvars.user.phone),
                [Validators.required, Validators.pattern('[0-9]+')]
            ]
        });
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.profileForm.controls;
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.profileForm.valid) {
            return await this.appService.updateProfile(
                'general', Utils.getFormData(this.profileForm.value, {'phone_code': this.appService.profvars.ccodePhoneValue})
            );
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID, 'dark').then();
    }

}
