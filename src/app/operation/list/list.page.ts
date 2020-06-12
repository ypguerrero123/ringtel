import {Component, OnInit} from '@angular/core';
import {Operation} from '../../model/operation';
import {AppService} from '../../services/app.service';
import {Utils} from '../../services/utils/utils';
import {MatTableDataSource} from "@angular/material/table";
import {Messages} from "../../config/messages";

@Component({
    selector: 'app-history',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    /**
     * @var string[]
     */
    public displayedColumns: string[] = ['data', 'status'];
    /**
     * @var Operation[]
     */
    public items: Operation[] = [];
    /**
     * @var MatTableDataSource
     */
    public dataSource = new MatTableDataSource<Operation>(this.items);
    /**
     * @var boolean
     */
    public loadingData: boolean = true;
    /**
     * @var number
     */
    private page = 0;
    /**
     * @var bool
     */
    private isFilter: boolean = false;

    /**
     * @var any
     */
    public customPickerOptionsStart: any;
    public customPickerOptionsEnd: any;
    /**
     * @var Date
     */
    public today: number = Date.now();
    public startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    public endDate = new Date(new Date().setDate(new Date().getDate()));

    /**
     * Constructor ListPage
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.appService.opvars.allOperations.subscribe({
            next: (ops: Operation[]) => {

                if (this.isFilter) {
                    this.items = [];
                }
                this.isFilter = false;
                this.items = this.items.concat(ops);

                this.dataSource.data = this.items;

                this.loadingData = false;
            }
        });

        this.loadRechargesHistory();

        this.customPickerOptionsStart = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.startDate = new Date(`${e.year.value}-${e.month.value}-${e.day.value}`);
                    this.filterByDate();
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
                    this.filterByDate();
                }
            }, {
                text: Messages.CANCEL,
                handler: () => {
                    return false;
                }
            }]
        };
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
     * @method filterByDate
     */
    private filterByDate() {
        if (this.endDate >= this.startDate) {
            this.isFilter = true;
            this.page = 0;
            this.loadRechargesHistory();
        }
    }

    /**
     * @method loadRechargesHistory
     */
    private loadRechargesHistory() {
        this.page = this.page + 1;
        this.appService.getAllOperations(Utils.formatDate(this.startDate), Utils.formatDate(this.endDate), this.page).then();
    }

    /**
     * @method loadPagination
     * @param event
     */
    public async loadPagination(event) {
        await this.loadRechargesHistory();
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

}
