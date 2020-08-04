import {Component, OnInit} from '@angular/core';
import {AgentTransferService} from '../service/agent-transfer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';
import {Utils} from '../../../shared/utils/utils';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.page.html',
    styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit {

    public agentsFrom: User[] = [];
    public agentsTo: User[] = [];

    public showAdminFrom = true;
    public showUserFrom = false;

    public showAdminTo = false;
    public showUserTo = true;

    public max = 1000000;

    public choiceTransfer = 'transfer_2';

    customActionSheetOptions: any = {
        header: 'Seleccione una opción',
    };

    /**
     * @var FormGroup
     */
    public agentForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public agentTransferService: AgentTransferService) {
    }

    /**
     * @method formControl
     */
    public get formControl() {
        return this.agentForm.controls;
    }

    ngOnInit() {

        this.max = parseInt(this.adminCredit());

        this.agentForm = this.formBuilder.group({
            transferChoice: ['transfer_2', [Validators.required]],
            agentFrom: ['', []],
            newBalance: [this.adminCredit(), TransferPage.newBalanceValidators(this.max)],
            agentTo: ['', [Validators.required]],
        });

        this.agentTransferService.allAgents.subscribe((agents: User[]) => {

            this.agentsFrom = agents;
            this.agentsTo = agents;

            this.updateFormHtml('transfer_2');
        });
        this.agentTransferService.getAllAgentsToSelect().then();
    }

    /**
     * @method newBalanceValidators
     * @param newBalance
     * @private
     */
    private static newBalanceValidators(newBalance) {
        return [
            Validators.required,
            Validators.pattern('[0-9.]+'),
            Validators.min(0),
            Validators.max(newBalance)
        ];
    }

    /**
     * @method onSubmit
     */
    public onSubmit() {
        if (this.agentForm.valid && (this.formControl.agentFrom.value != this.formControl.agentTo.value)) {
            return this.agentTransferService.editAgentBalance(Utils.getFormData(this.agentForm.value)).then();
        }
        return this.agentTransferService.appService.presentToast(Messages.FORM_NOT_VALID).then();
    }

    /**
     * @method adminCredit
     * @private
     */
    private adminCredit() {
        return parseFloat(this.agentTransferService.appService.user.balance).toFixed(2);
    }

    /**
     * @method changeTransfer
     * @param $event
     */
    public changeTransfer($event: CustomEvent) {
        this.updateFormHtml($event.detail.value);
    }


    /**
     * @method updateFormHtml
     * @param choice
     * @private
     */
    private updateFormHtml(choice: string) {

        this.choiceTransfer = choice;

        if (choice === 'transfer_1') { // De un Agente ---> Hacia un Agente

            this.showUserFrom = true;
            this.showAdminFrom = false;

            this.updateFormFields(0.00, false, true, true);

            this.showUserTo = true;
            this.showAdminTo = false;

        } else if (choice === 'transfer_2') { // De la Tienda ---> Hacia un Agente

            this.showUserFrom = false;
            this.showAdminFrom = true;

            this.updateFormFields(this.adminCredit(), false, false, true);

            this.showUserTo = true;
            this.showAdminTo = false;

        } else { // De un Agente ---> Hacia la Tienda

            this.showUserFrom = true;
            this.showAdminFrom = false;

            this.updateFormFields(0.00, false, true, false);

            this.showUserTo = false;
            this.showAdminTo = true;

        }
    }

    /**
     * @method updateFormFields
     * @param newBalance
     * @param withdata
     * @param agentFromRequired
     * @param agentToRequired
     * @private
     */
    private updateFormFields(newBalance, withdata: boolean = false, agentFromRequired: boolean = false, agentToRequired: boolean = true) {

        this.max = newBalance;

        this.formControl.newBalance.setValidators(TransferPage.newBalanceValidators(newBalance));
        this.formControl.agentFrom.setValidators(agentFromRequired ? [Validators.required] : null);
        this.formControl.agentTo.setValidators(agentToRequired ? [Validators.required] : null);

        this.agentForm.setValue({
            transferChoice: this.choiceTransfer,
            agentFrom: withdata ? this.agentForm.value.agentFrom : '',
            newBalance: newBalance,
            agentTo: withdata ? this.agentForm.value.agentTo : '',
        });

    }

    /**
     * @method changeAgentFrom
     * @param $event
     */
    public changeAgentFrom($event: CustomEvent) {

        const choice = $event.detail.value;

        if (choice && choice != '') {

            this.updateFormFields(this.getAgentBalanceFrom(choice), true, this.choiceTransfer == 'transfer_1' || this.choiceTransfer == 'transfer_3'
                , this.choiceTransfer == 'transfer_1' || this.choiceTransfer == 'transfer_2');

            this.agentsTo = this.choiceTransfer == 'transfer_1' ? this.filterAgentTo(this.agentsFrom, choice) : this.agentsFrom;
        }

    }

    /**
     * @method getAgentBalanceFrom
     * @param agentChoiceFrom
     * @private
     */
    private getAgentBalanceFrom(agentChoiceFrom) {
        for (let i = 0; i < this.agentsFrom.length; i++) {
            if (this.agentsFrom[i].id == agentChoiceFrom) {
                return this.agentsFrom[i].balance;
            }
        }

        return 0.00;
    }

    /**
     * @method filterAgentTo
     * @param agentsFrom
     * @param agentChoiceFrom
     * @private
     */
    private filterAgentTo(agentsFrom: User[], agentChoiceFrom) {
        return agentsFrom.filter(agent => agent.id != agentChoiceFrom);
    }

}
