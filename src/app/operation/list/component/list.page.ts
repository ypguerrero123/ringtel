import {Component, OnInit} from '@angular/core';
import {Operation} from '../../../shared/model/operation';
import {Utils} from '../../../shared/utils/utils';
import {MatTableDataSource} from '@angular/material/table';
import {Messages} from '../../../shared/config/messages';
import {OperationListService} from '../service/operation-list.service';

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
    public cantData: number = 0;
    /**
     * @var any
     */
    public customPickerOptionsStart: any;
    public customPickerOptionsEnd: any;
    /**
     * @var Date
     */
    public today: number = Date.now();
    public startDate = new Date(new Date().setDate(new Date().getDate() - 5));
    public endDate = new Date(new Date().setDate(new Date().getDate()));
    /**
     * @var number
     */
    private page = 0;
    /**
     * @var bool
     */
    private isFilter: boolean = false;

    /**
     * Constructor
     * @param operationListService
     */
    constructor(public operationListService: OperationListService) {
    }

    ngOnInit() {
        this.operationListService.allOperations.subscribe({
            next: (ops: Operation[]) => {

                if (this.isFilter) {
                    this.items = [];
                }
                this.isFilter = false;
                this.items = this.items.concat(ops);
                this.cantData = this.items.length;

                this.dataSource.data = this.items;
                this.loadingData = false;
            }
        });

        this.loadRechargesHistory();

        this.customPickerOptionsStart = {
            buttons: [{
                text: Messages.DONE,
                handler: (e) => {
                    this.startDate = new Date(Utils.transformDate(e));
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
                    this.endDate = new Date(Utils.transformDate(e));
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
     * @method loadPagination
     * @param event
     */
    public async loadPagination(event) {

        await this.loadRechargesHistory();

        setTimeout(() => {
            event.target.complete();
        }, 500);
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
        this.operationListService.getAllOperations(Utils.formatDate(this.startDate), Utils.formatDate(this.endDate), this.page).then();
    }

}
