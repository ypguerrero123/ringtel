import {Component, OnInit} from '@angular/core';
import {ProcessingPendingService} from '../service/processing-pending.service';
import {Operation} from '../../../shared/model/operation';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-processing-pending',
    templateUrl: './processing-pending.page.html',
    styleUrls: ['./processing-pending.page.scss'],
})
export class ProcessingPendingPage implements OnInit {

    /**
     * @var string[]
     */
    public displayedColumns: string[] = ['data', 'status'];

    /**
     * @var Operation[]
     */
    public itemsPending: Operation[] = [];
    public itemsProcessing: Operation[] = [];
    /**
     * @var MatTableDataSource
     */
    public dataSourcePending = new MatTableDataSource<Operation>(this.itemsPending);
    public dataSourceProcessing = new MatTableDataSource<Operation>(this.itemsProcessing);

    /**
     * @var boolean
     */
    public loadingData: boolean = true;
    /**
     * @var number
     */
    public cantPendingData: number = 0;
    public cantProcessingData: number = 0;

    /**
     * Constructor
     * @param processingPendingService
     */
    constructor(public processingPendingService: ProcessingPendingService) {
    }

    ngOnInit() {
        this.processingPendingService.allOperations.subscribe({
            next: (ops: Operation[]) => {

                ProcessingPendingPage.filterOps(ops).then((result: Operation[]) => {
                    this.itemsPending = result;
                    this.dataSourcePending.data = this.itemsPending;
                    this.cantPendingData = this.itemsPending.length;
                });
                ProcessingPendingPage.filterOps(ops, 'PROCESSING').then((result: Operation[]) => {
                    this.itemsProcessing = result;
                    this.dataSourceProcessing.data = this.itemsProcessing;
                    this.cantProcessingData = this.itemsProcessing.length;
                });

                this.loadingData = false;
            }
        });

        this.processingPendingService.listProcessingPending().then();
    }

    /**
     * @method filterOps
     * @param ops
     * @param status
     */
    private static async filterOps(ops: Operation[], status: string = 'PENDING') {

        let result: Operation[] = [];
        for (let i = 0; i < ops.length; i++) {
            if (ops[i].status == status) {
                result.push(ops[i]);
            }
        }
        return result;
    }

    /**
     * @method applyFilterPending
     * @param event
     */
    public applyFilterPending(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourcePending.filter = filterValue.trim().toLowerCase();
    }

    /**
     * @method applyFilterProcessing
     * @param event
     */
    public applyFilterProcessing(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceProcessing.filter = filterValue.trim().toLowerCase();
    }
}
