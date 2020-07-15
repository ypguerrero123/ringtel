import {Component, Input, OnInit} from '@angular/core';
import {AppRoutes} from '../../config/routes';
import {Constants} from '../../config/constants';
import {RechargeService} from '../../../home/service/recharge.service';
import {AgentListService} from '../../../agents/list/service/agent-list.service';
import {ShoppingService} from '../../../shopping/service/shopping.service';
import {CreditCardService} from '../../../creditcards/service/credit-card.service';
import {ProcessingPendingService} from '../../../operation/processing-pending/service/processing-pending.service';
import {ActivatedRoute} from '@angular/router';
import {AgentShowService} from '../../../agents/show/service/agent-show.service';

@Component({
    selector: 'app-refresh',
    templateUrl: './refresh.component.html',
    styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {

    @Input() routePage: string;

    constructor(private route: ActivatedRoute,
                private rechargeService: RechargeService,
                private agentListService: AgentListService,
                private agentShowService: AgentShowService,
                private shoppingService: ShoppingService,
                private creditCardService: CreditCardService,
                private processingPendingService: ProcessingPendingService
    ) {
    }

    ngOnInit() {
    }

    /**
     * @method doRefresh
     * @param event
     */
    public doRefresh(event) {
        switch (this.routePage) {
            case AppRoutes.APP_CUBACEL_RECHARGE:
                this.rechargeService.verifyPreSaleActive().then();
                this.rechargeService.getAllRechargesByServiceSlug(Constants.CUBACEL_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_NAUTA_RECHARGE:
                this.rechargeService.getAllRechargesByServiceSlug(Constants.NAUTA_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_LONG_DISTANCE_RECHARGE:
                this.rechargeService.getAllRechargesByServiceSlug(Constants.LONG_DISTANCE_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_AGENTS_LIST:
                this.agentListService.getAllAgents().then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_AGENTS_SHOW:
                this.route.params.subscribe(params => {
                    this.agentShowService.getAgentOperationData(params['id']).then(() => {
                        event.target.complete();
                    });
                });
                break;
            case AppRoutes.APP_SHOPPING_CART:
                this.shoppingService.getAllShoppings(false).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_CREDIT_CARD_DETAIL:
                this.creditCardService.getAllPaymentMethods().then();
                this.creditCardService.getAllCustomerCharges().then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_RECHARGE_PROCESSING_PENDING:
                this.processingPendingService.listProcessingPending().then(() => {
                    event.target.complete();
                });
                break;
            default:
                this.creditCardService.appService.getProfile().then(() => {
                    event.target.complete();
                });
                break;
        }
    }

}
