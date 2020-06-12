import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {UserDataResponse} from "../../../model/user";
import {DatePipe} from "@angular/common";
import {Utils} from "../../../services/utils/utils";
import {Messages} from "../../../config/messages";

@Component({
    selector: 'app-home-container',
    templateUrl: './home-container.component.html',
    styleUrls: ['./home-container.component.scss'],
})
export class HomeContainerComponent implements OnInit {

    /**
     * @var any
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
     * @var any
     */
    public totalEarnings: any = 0.00;
    public totalSellingCost: any = 0.00;
    public totalSalePrice: any = 0.00;

    /**
     * @var UserDataResponse
     */
    public agentToShow: UserDataResponse = null;

    /**
     * Constructor
     * @param appService
     * @param datePipe
     */
    constructor(public appService: AppService, private datePipe: DatePipe) {
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
        this.appService.secvars.userHasUpdate.subscribe(() => {
            this.getProfile();
        });

        this.customPickerOptionsStart = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.startDate = new Date(`${e.year.value}-${e.month.value}-${e.day.value}`);
                    this.getProfile()
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
                    this.endDate = new Date(`${e.year.value}-${e.month.value}-${e.day.value}`);
                    this.getProfile();
                }
            }, {
                text: Messages.CANCEL,
                handler: () => {
                    return false;
                }
            }]
        };

        this.getProfile();
    }

    /**
     * @method getProfile
     */
    public getProfile() {
        const data = Utils.getFormData({
            'date_range': `${this.datePipe.transform(this.startDate, 'yyyy-MM-dd')} - ${this.datePipe.transform(this.endDate, 'yyyy-MM-dd')}`
        });
        this.appService.getProfile(data).then();
    }


}
