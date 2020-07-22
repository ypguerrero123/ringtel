import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Transfer} from '../../../shared/model/transfer';
import {TransferListService} from '../service/transfer-list.service';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public appRoutes = AppRoutes;

    /**
     * @var string[]
     */
    public displayedColumns: string[] = ['from', 'to'];
    /**
     * @var Transfer[]
     */
    public items: Transfer[] = [];
    /**
     * @var MatTableDataSource
     */
    public dataSource = new MatTableDataSource<Transfer>(this.items);
    /**
     * @var boolean
     */
    public loadingData: boolean = true;
    /**
     * @var number
     */
    private page = 0;

    /**
     * Constructor
     * @param transferListService
     */
    constructor(public transferListService: TransferListService) {
    }

    ngOnInit() {
        this.transferListService.allTransfers.subscribe({
            next: (transfers: Transfer[]) => {

                this.items = transfers;
                this.dataSource.data = this.items;
                this.loadingData = false;

            }
        });
        this.transferListService.concatTransfers.subscribe({
            next: (transfers: Transfer[]) => {

                this.items = this.items.concat(transfers);
                this.dataSource.data = this.items;
                this.loadingData = false;

            }
        });

        this.loadAllTransfers();
    }

    /**
     * @method applyFilter
     * @param event
     */
    public applyFilter(event: Event) {
        this.dataSource.filter = ((event.target as HTMLInputElement).value).trim().toLowerCase();
    }

    /**
     * @method loadAllTransfers
     * @param concat
     */
    public loadAllTransfers(concat: boolean = false) {
        this.page = this.page + 1;
        this.transferListService.getAllTransfer(this.page, concat).then();
    }

    /**
     * @method loadPagination
     * @param event
     */
    public async loadPagination(event) {
        await this.loadAllTransfers(true);
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }
}
