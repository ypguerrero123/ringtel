import {Component, OnInit} from '@angular/core';
import {Utils} from '../../../shared/utils/utils';
import {User} from '../../../shared/model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Messages} from '../../../shared/config/messages';
import {TransferCreateService} from '../service/transfer-create.service';

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
     * Constructor
     * @param formBuilder
     * @param transferCreateService
     */
    constructor(private formBuilder: FormBuilder, public transferCreateService: TransferCreateService) {
    }

    /**
     * @method phoneFormControl
     */
    public get formControl() {
        return this.creditForm.controls;
    }

    ngOnInit() {
        const balance = this.transferCreateService.appService.user.balance;
        this.creditForm = this.formBuilder.group({
            creditSend: [parseFloat(balance).toFixed(2),
                [Validators.required, Validators.max(Number(balance)), Validators.min(10)]
            ],
        });
        this.transferCreateService.agentsFounds.subscribe({
            next: (agentsFound: User[]) => {
                this.agentsFound = agentsFound;
            }
        });
    }

    /**
     * @method searchAgents
     */
    public async searchAgents() {
        this.transferCreateService.searchAgents(Utils.getFormData({'search': this.searchValue})).then();
    }

    /**
     * @method transferCredit
     * @param agentTo
     */
    public async transferCredit(agentTo: number) {
        if (this.creditForm.valid) {
            return this.transferCreateService.transferCredit(agentTo, Utils.getFormData({'credit': this.creditForm.value.creditSend})).then();
        }
        return this.transferCreateService.appService.presentToast(Messages.CREDIT_NOT_VALID).then();
    }

}
