import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Messages} from '../../config/messages';
import {UserDataResponse} from '../../model/user';
import {Utils} from '../../services/utils/utils';

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

    /**
     * @var Date
     */
    public today: number = Date.now();
    public startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    public endDate = new Date(new Date().setDate(new Date().getDate()));

    /**
     * @var any
     */
    public customPickerOptionsStart: any;
    public customPickerOptionsEnd: any;

    /**
     * @var UserDataResponse
     */
    public agentToShow: UserDataResponse = null;

    /**
     * @var any
     */
    public totalEarnings: any = 0.00;
    public totalSellingCost: any = 0.00;
    public totalSalePrice: any = 0.00;
    /**
     * @var number
     */
    private id: number = null;

    /**
     * Constructor
     * @param appService
     * @param route
     * @param datePipe
     */
    constructor(public appService: AppService, private route: ActivatedRoute, private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.appService.agentsVars.agentOperationData.subscribe((agentToShow: UserDataResponse) => {
            this.agentToShow = agentToShow;

            this.totalEarnings = agentToShow && agentToShow.data.totalSellingSales.totalSellingCost && agentToShow.data.totalSellingSales.totalSalePrice
                ? (parseFloat(this.agentToShow.data.totalSellingSales.totalSellingCost) - parseFloat(this.agentToShow.data.totalSellingSales.totalSalePrice)).toFixed(2)
                : 0.00;
            this.totalSellingCost = agentToShow && agentToShow.data.totalSellingSales.totalSellingCost
                ? parseFloat(this.agentToShow.data.totalSellingSales.totalSellingCost).toFixed(2)
                : 0.00;
            this.totalSalePrice = agentToShow && agentToShow.data.totalSellingSales.totalSalePrice
                ? parseFloat(this.agentToShow.data.totalSellingSales.totalSalePrice).toFixed(2)
                : 0.00;
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.appService.getAgentOperationData(params['id'], this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).then();
        });

        this.customPickerOptionsStart = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.startDate = new Date(Utils.transformDate(e));
                    if (this.id) {
                        this.appService.getAgentOperationData(this.id, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).then();
                    }
                }
            }, {
                text: Messages.CANCEL,
                handler: () => {
                    return false;
                }
            }]
        };
        this.customPickerOptionsEnd = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.endDate = new Date(Utils.transformDate(e));
                    if (this.id) {
                        this.appService.getAgentOperationData(this.id, this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).then();
                    }
                }
            }, {
                text: Messages.CANCEL,
                handler: () => {
                    return false;
                }
            }]
        };
    }

}
