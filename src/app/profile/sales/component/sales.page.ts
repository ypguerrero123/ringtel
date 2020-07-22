import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../../shared/utils/utils';
import {Messages} from '../../../shared/config/messages';
import {ProfileSalesService} from '../service/profile-sales.service';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.page.html',
    styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

    public appRoutes = AppRoutes;

    /**
     * @var FormGroup
     */
    public saleForm: FormGroup;

    /**
     * Constructor
     * @param formBuilder
     * @param profileSalesService
     */
    constructor(private formBuilder: FormBuilder, public profileSalesService: ProfileSalesService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.saleForm.controls;
    }

    ngOnInit() {

        this.saleForm = this.formBuilder.group({
            sellingCostCubacel: [this.profileSalesService.appService.user.selling_cost_cubacel,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ],
            sellingCostNauta: [this.profileSalesService.appService.user.selling_cost_nauta,
                [Validators.required, Validators.pattern('[0-9.]+')]
            ]
        });

    }

    /**
     * @method onSubmit
     */
    public async onSubmit() {
        if (this.saleForm.valid) {
            return await this.profileSalesService.updateSalesProfile(
                'sales-update', Utils.getFormData(this.saleForm.value)
            );
        }
        return this.profileSalesService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

}
