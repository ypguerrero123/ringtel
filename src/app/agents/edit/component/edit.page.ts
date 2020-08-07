import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/model/user';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';
import {AgentEditService} from '../service/agent-edit.service';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    public appRoutes = AppRoutes;

    /**
     * @var FormGroup
     */
    public agentForm: FormGroup;
    /**
     * @var UserDataResponse
     */
    public agentToEdit: User = null;

    /**
     * Constructor
     * @param route
     * @param formBuilder
     * @param agentEditService
     */
    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public agentEditService: AgentEditService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.agentForm.controls;
    }

    ngOnInit() {

        this.agentEditService.agent.subscribe((agentToEdit: User) => {
            this.agentToEdit = agentToEdit;

            this.agentEditService.appService.updateCCodePhoneValue(agentToEdit.phoneCodeNumber);

            this.agentForm.setValue({
                name: agentToEdit.name,
                email: agentToEdit.email,
                phone: Utils.strFixPhoneNumber(agentToEdit.phone),
                salePriceCubacel: agentToEdit.sale_price_cubacel,
                salePriceNauta: agentToEdit.sale_price_nauta,
                password: '',
            });
        });

        this.agentForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            salePriceCubacel: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            salePriceNauta: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            password: ['', [Validators.minLength(8)]],
        });

        this.route.params.subscribe(params => {
            this.agentEditService.getAgent(params['id']).then();
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.agentForm.valid) {
            return await this.agentEditService.editAgent(
                this.agentToEdit.id, Utils.getFormData(this.agentForm.value, {'phone_code': this.agentEditService.appService.ccodePhoneValue})
            );
        }
        return this.agentEditService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
