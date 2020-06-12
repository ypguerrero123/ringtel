import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {MatTableDataSource} from "@angular/material/table";
import {Transfer} from "../../model/transfer";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

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

    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.appService.transfvars.allTransfers.subscribe({
            next: (transfers: Transfer[]) => {
                this.items = transfers;
                this.dataSource.data = this.items;
                this.loadingData = false;
            }
        });
        this.appService.transfvars.concatTransfers.subscribe({
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
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /**
     * @method loadAllTransfers
     * @param concat
     */
    public loadAllTransfers(concat: boolean = false) {
        this.page = this.page + 1;
        this.appService.getAllTransfer(this.page, concat).then();
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
