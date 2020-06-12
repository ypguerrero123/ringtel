import {Component, OnInit} from '@angular/core';
import {Shopping} from '../model/shopping';
import {AlertController} from '@ionic/angular';
import {AppService} from '../services/app.service';
import {Messages} from '../config/messages';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.page.html',
    styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

    /**
     * @var string[]
     */
    public displayedColumns: string[] = ['account', 'service', 'errorMessage'];
    /**
     * @var MatTableDataSource
     */
    public tableDataSource: MatTableDataSource<Shopping> = new MatTableDataSource<Shopping>([]);

    /**
     * @var bool
     */
    public loadingData: boolean = true;

    /**
     * @var any
     */
    public totalAmount: any;

    /**
     * Constructor ShoppingPage
     * @param appService
     * @param alertController
     */
    constructor(public appService: AppService, private alertController: AlertController) {
    }

    ngOnInit() {
        this.appService.shvars.AllShoppings.subscribe((shoppings: Shopping[]) => {
            this.readShoppingsData(shoppings).then();
            this.tableDataSource.data = shoppings;
        });
        this.appService.getAllShoppings(true).then();
    }

    /**
     * @method applyFilter
     * @param event
     */
    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tableDataSource.filter = filterValue.trim().toLowerCase();
    }

    /**
     * @method showErrorMessage
     * @param item
     */
    public async showErrorMessage(item: Shopping) {
        const alert = await this.alertController.create({
            header: item.service.toUpperCase(),
            message: `<h2 class="mb-1">${item.client}</h2>
                                <h3 class="mb-1">${item.account}</h3>
                                <p class="danger">${item.errorMessage}</p>`,
            buttons: [Messages.CLOSE]
        });

        await alert.present();
    }

    /**
     * @method readShoppingsData
     * @param shoppings
     */
    private async readShoppingsData(shoppings: Shopping[]) {
        const user = this.appService.secvars.user;
        let amount: number = 0.00;
        await shoppings.forEach((shopping: Shopping) => {
            if (shopping.service == 'cubacel' && user.sale_price_cubacel) {
                amount += parseFloat(user.sale_price_cubacel);
            } else if (shopping.service == 'nauta' && user.sale_price_nauta) {
                amount += parseFloat(user.sale_price_nauta);
            } else {
                amount += parseFloat(shopping.recharge.salePrice);
            }
        });
        this.totalAmount = amount.toFixed(2);
        this.loadingData = false;
    }
}
