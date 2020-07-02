import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {UserDataResponse} from '../../../shared/model/user';
import {DatePipe} from '@angular/common';
import {Messages} from '../../../shared/config/messages';
import {Utils} from '../../../shared/utils/utils';

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
    public userToShow: UserDataResponse = null;

    /**
     * Constructor
     * @param datePipe
     * @param appService
     */
    constructor(private datePipe: DatePipe, public appService: AppService) {
    }

    ngOnInit() {
        this.appService.userOperationData.subscribe((userToShow: UserDataResponse) => {
            this.userToShow = userToShow;

            this.totalEarnings = userToShow && userToShow.data.totalSellingSales.totalSellingCost && userToShow.data.totalSellingSales.totalSalePrice
                ? (parseFloat(this.userToShow.data.totalSellingSales.totalSellingCost) - parseFloat(this.userToShow.data.totalSellingSales.totalSalePrice)).toFixed(2)
                : 0.00;
            this.totalSellingCost = userToShow && userToShow.data.totalSellingSales.totalSellingCost
                ? parseFloat(this.userToShow.data.totalSellingSales.totalSellingCost).toFixed(2)
                : 0.00;
            this.totalSalePrice = userToShow && userToShow.data.totalSellingSales.totalSalePrice
                ? parseFloat(this.userToShow.data.totalSellingSales.totalSalePrice).toFixed(2)
                : 0.00;

        });
        this.appService.userHasUpdate.subscribe(() => {
            this.getProfile();
        });

        this.customPickerOptionsStart = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.startDate = new Date(Utils.transformDate(e));
                    this.getProfile();
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
        this.appService.getProfile(this.datePipe.transform(this.startDate, 'yyyy-MM-dd'), this.datePipe.transform(this.endDate, 'yyyy-MM-dd')).then();
    }

}
