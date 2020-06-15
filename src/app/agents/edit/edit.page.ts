import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {Utils} from '../../services/utils/utils';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

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
     * @param appService
     * @param route
     * @param formBuilder
     */
    constructor(public appService: AppService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.agentForm.controls;
    }

    ngOnInit() {
        this.appService.agentsVars.agent.subscribe((agentToEdit: User) => {
            this.agentToEdit = agentToEdit;

            this.appService.profvars.updateCCodePhoneValue(agentToEdit.phoneCodeNumber);

            this.agentForm.setValue({
                name: agentToEdit.name,
                email: agentToEdit.email,
                phone: Utils.strFixPhoneNumber(agentToEdit.phone),
                balance: agentToEdit.balance,
                salePriceCubacel: agentToEdit.sale_price_cubacel,
                salePriceNauta: agentToEdit.sale_price_nauta,
                password: '',
            });
        });

        this.agentForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            balance: ['', [Validators.required, Validators.pattern('[0-9.]+'), Validators.min(10)]],
            salePriceCubacel: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            salePriceNauta: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
            password: ['', [Validators.minLength(8)]],
        });

        this.route.params.subscribe(params => {
            this.appService.getAgent(params['id']).then();
        });
    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.agentForm.valid) {
            return await this.appService.editAgent(
                this.agentToEdit.id, Utils.getFormData(this.agentForm.value, {'phone_code': this.appService.profvars.ccodePhoneValue})
            );
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
