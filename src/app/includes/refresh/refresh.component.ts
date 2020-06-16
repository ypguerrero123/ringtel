import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {AppRoutes} from '../../config/routes';
import {Constants} from '../../config/constants';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-refresh',
    templateUrl: './refresh.component.html',
    styleUrls: ['./refresh.component.scss'],
})
export class RefreshComponent implements OnInit {

    @Input() routePage: string;

    /**
     *
     * @param appService
     * @param datePipe
     */
    constructor(private appService: AppService, private datePipe: DatePipe) {
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
                this.appService.getAllRechargesByServiceSlug(Constants.CUBACEL_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_NAUTA_RECHARGE:
                this.appService.getAllRechargesByServiceSlug(Constants.NAUTA_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_LONG_DISTANCE_RECHARGE:
                this.appService.getAllRechargesByServiceSlug(Constants.LONG_DISTANCE_SLUG).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_AGENTS_LIST:
                this.appService.getAllAgents().then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_SHOPPING_CART:
                this.appService.getAllShoppings(false).then(() => {
                    event.target.complete();
                });
                break;
            case AppRoutes.APP_CREDIT_CARD_DETAIL:
                this.appService.getAllPaymentMethods().then();
                this.appService.getAllCustomerCharges().then(() => {
                    event.target.complete();
                });
                break;
            default:
                this.getProfile(event);
                break;
        }
    }

    /**
     * @method getProfile
     */
    public getProfile(event) {

        const startDate = new Date(new Date().setDate(new Date().getDate() - 7));
        const endDate = new Date(new Date().setDate(new Date().getDate()));

        this.appService.getProfile(this.datePipe.transform(startDate, 'yyyy-MM-dd'), this.datePipe.transform(endDate, 'yyyy-MM-dd')).then(() => {
            event.target.complete();
        });
    }

}
