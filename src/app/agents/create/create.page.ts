import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../services/utils/utils';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    /**
     * @var FormGroup
     */
    public agentForm: FormGroup;

    /**
     * Constructor
     * @param appService
     * @param formBuilder
     */
    constructor(public appService: AppService, private formBuilder: FormBuilder) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.agentForm.controls;
    }

    ngOnInit() {
        this.agentForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            balance: ['', [Validators.required, Validators.pattern('[0-9.]+'), Validators.min(10)]],
            salePriceCubacel: [this.appService.secvars.user.selling_cost_cubacel,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ],
            salePriceNauta: [this.appService.secvars.user.selling_cost_nauta,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.agentForm.valid) {
            return await this.appService.createAgent(
                Utils.getFormData(this.agentForm.value, {'phone_code': this.appService.profvars.ccodePhoneValue})
            );
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
