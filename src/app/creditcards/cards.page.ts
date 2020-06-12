import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {MatTableDataSource} from '@angular/material/table';
import {Charge, Method} from '../model/stripe';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.page.html',
    styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

    /**
     * @var bool
     */
    public loadingMethods: boolean = true;
    /**
     * @var bool
     */
    public loadingCharges: boolean = true;

    /**
     * @var string[]
     */
    public methodsDisplayedColumns: string[] = ['data', 'action'];
    /**
     * @var string[]
     */
    public chargesDisplayedColumns: string[] = ['id', 'status'];
    /**
     * @var MatTableDataSource
     */
    public methodsTableDataSource: MatTableDataSource<Method> = new MatTableDataSource([]);
    /**
     * @var MatTableDataSource
     */
    public chargesTableDataSource: MatTableDataSource<Charge> = new MatTableDataSource([]);

    /**
     * Constructor CardsPage
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.appService.stvars.savedPaymentMethods.subscribe({
            next: (savedPaymentMethods: Method[]) => {
                this.methodsTableDataSource.data = savedPaymentMethods;
                this.loadingMethods = false;
            }
        });
        this.appService.stvars.customerCharges.subscribe({
            next: (charges: Charge[]) => {
                this.chargesTableDataSource.data = charges;
                this.loadingCharges = false;
            }
        });
        this.appService.getAllPaymentMethods().then();
        this.appService.getAllCustomerCharges().then();
    }

    /**
     * @method detachPaymentMethod
     * @param paymentId
     */
    public detachPaymentMethod(paymentId) {
        this.appService.detachPaymentMethod(paymentId).then();
    }

}
