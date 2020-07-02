import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Charge, Method} from '../../shared/model/stripe';
import {CreditCardService} from '../service/credit-card.service';

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
     * @param creditCardService
     */
    constructor(public creditCardService: CreditCardService) {
    }

    ngOnInit() {
        this.creditCardService.savedPaymentMethods.subscribe({ 
            next: (savedPaymentMethods: Method[]) => {
                this.methodsTableDataSource.data = savedPaymentMethods;
                this.loadingMethods = false;
            }
        });
        this.creditCardService.customerCharges.subscribe({
            next: (charges: Charge[]) => {
                this.chargesTableDataSource.data = charges;
                this.loadingCharges = false;
            }
        });
        this.creditCardService.getAllPaymentMethods().then();
        this.creditCardService.getAllCustomerCharges().then();
    }

    /**
     * @method detachPaymentMethod
     * @param paymentId
     */
    public detachPaymentMethod(paymentId) {
        this.creditCardService.detachPaymentMethod(paymentId).then();
    }

}
