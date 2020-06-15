import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Utils} from '../../services/utils/utils';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../config/messages';

@Component({
    selector: 'app-transfer',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

    /**
     * @var FormGroup
     */
    public creditForm: FormGroup;
    /**
     * @var string
     */
    public searchValue: string = '';
    /**
     * @var array
     */
    public agentsFound: User[] = [];

    /**
     * Constructor CreatePage
     * @param appService
     * @param formBuilder
     */
    constructor(public appService: AppService, private formBuilder: FormBuilder) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.creditForm.controls;
    }

    ngOnInit() {
        const balance = this.appService.secvars.user.balance;
        this.creditForm = this.formBuilder.group({
            creditSend: [parseFloat(balance).toFixed(2),
                [Validators.required, Validators.max(Number(balance)), Validators.min(10)]
            ],
        });
        this.appService.transfvars.agentsFounds.subscribe({
            next: (agentsFound: User[]) => {
                this.agentsFound = agentsFound;
            }
        });
    }

    /**
     * @method searchAgents
     */
    public async searchAgents() {
        this.appService.searchAgents(Utils.getFormData({'search': this.searchValue})).then();
    }

    /**
     * @method transferCredit
     * @param agentTo
     */
    public async transferCredit(agentTo: number) {
        if (this.creditForm.valid) {
            return this.appService.transferCredit(agentTo, Utils.getFormData({'credit': this.creditForm.value.creditSend})).then();
        }
        return this.appService.presentToast(Messages.CREDIT_NOT_VALID).then();
    }

}
