import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';
import {ProfileGeneralService} from '../service/profile-general.service';

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
     * Constructor
     * @param formBuilder
     * @param profileGeneralService
     */
    constructor(private formBuilder: FormBuilder, public profileGeneralService: ProfileGeneralService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.profileForm.controls;
    }

    ngOnInit() {

        this.profileGeneralService.appService.updateCCodePhoneValue(this.profileGeneralService.appService.user.phoneCodeNumber);

        this.profileForm = this.formBuilder.group({
            name: [this.profileGeneralService.appService.user.name,
                [Validators.required, Validators.minLength(2)]
            ],
            email: [this.profileGeneralService.appService.user.email,
                [Validators.required, Validators.email]
            ],
            phone: [Utils.strFixPhoneNumber(this.profileGeneralService.appService.user.phone),
                [Validators.required, Validators.pattern('[0-9]+')]
            ]
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.profileForm.valid) {
            return await this.profileGeneralService.updateProfile(
                'general', Utils.getFormData(this.profileForm.value, {'phone_code': this.profileGeneralService.appService.ccodePhoneValue})
            );
        }
        return this.profileGeneralService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
