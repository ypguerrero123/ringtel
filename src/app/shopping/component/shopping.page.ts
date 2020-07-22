import {Component, OnInit} from '@angular/core';
import {Shopping} from '../../shared/model/shopping';
import {AlertController} from '@ionic/angular';
import {Messages} from '../../shared/config/messages';
import {MatTableDataSource} from '@angular/material/table';
import {ShoppingService} from '../service/shopping.service';
import {AppRoutes} from '../../shared/config/routes';

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.page.html',
    styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

    public appRoutes = AppRoutes;

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
     * @param alertController
     * @param shoppingService
     */
    constructor(private alertController: AlertController, public shoppingService: ShoppingService) {
    }

    ngOnInit() {
        this.shoppingService.allShoppings.subscribe((shoppings: Shopping[]) => {
            this.readShoppingsData(shoppings).then();
            this.tableDataSource.data = shoppings;
        });
        this.shoppingService.getAllShoppings(true).then();
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
            message: `<p>Nombre: ${item.client}</p><hr/><p>Cuenta: ${item.account}</p><hr/><p>Recarga: ${item.recharge.slug}</p><hr/>${item.errorMessage}`,
            buttons: [Messages.CLOSE]
        });

        await alert.present();
    }

    /**
     * @method readShoppingsData
     * @param shoppings
     */
    private async readShoppingsData(shoppings: Shopping[]) {
        const user = this.shoppingService.appService.user;
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
