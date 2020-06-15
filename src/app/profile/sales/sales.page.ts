import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../services/utils/utils';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.page.html',
    styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

    /**
     * @var FormGroup
     */
    public saleForm: FormGroup;

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
        return this.saleForm.controls;
    }

    ngOnInit() {

        this.saleForm = this.formBuilder.group({
            sellingCostCubacel: [this.appService.secvars.user.selling_cost_cubacel,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ],
            sellingCostNauta: [this.appService.secvars.user.selling_cost_nauta,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ]
        });

    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.saleForm.valid) {
            return await this.appService.updateProfile(
                'sales-update', Utils.getFormData(this.saleForm.value)
            );
        }
        return this.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
