import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';
import {AgentCreateService} from '../service/agent-create.service';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    public appRoutes = AppRoutes;

    /**
     * @var FormGroup
     */
    public agentForm: FormGroup;

    /**
     * Constructor
     * @param formBuilder
     * @param agentCreateService
     */
    constructor(private formBuilder: FormBuilder, public agentCreateService: AgentCreateService) {
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
            salePriceCubacel: [this.agentCreateService.appService.user.selling_cost_cubacel,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ],
            salePriceNauta: [this.agentCreateService.appService.user.selling_cost_nauta,
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
            return await this.agentCreateService.createAgent(
                Utils.getFormData(this.agentForm.value, {'phone_code': this.agentCreateService.appService.ccodePhoneValue})
            );
        }
        return this.agentCreateService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
