import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserDataResponse} from '../../../shared/model/user';
import {AgentShowService} from '../service/agent-show.service';
import {Operation} from '../../../shared/model/operation';
import {MatTableDataSource} from '@angular/material/table';
import {AppRoutes} from '../../../shared/config/routes';

@Component({
    selector: 'app-show',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

    public appRoutes = AppRoutes;

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
     * @var UserDataResponse
     */
    public agentToShow: UserDataResponse = null;

    /**
     * @var any
     */
    public totalEarnings: any = 0.00;
    public totalSellingCost: any = 0.00;
    public totalSalePrice: any = 0.00;
    /**
     * @var number
     */
    private id: number = null;

    /**
     * Constructor
     * @param route
     * @param agentShowService
     */
    constructor(private route: ActivatedRoute, public agentShowService: AgentShowService) {
    }

    ngOnInit() {
        this.agentShowService.agentOperationData.subscribe((agentToShow: UserDataResponse) => {
            this.agentToShow = agentToShow;

            this.totalEarnings = agentToShow && agentToShow.data.totalSellingSales.totalSellingCost && agentToShow.data.totalSellingSales.totalSalePrice
                ? (parseFloat(this.agentToShow.data.totalSellingSales.totalSellingCost) - parseFloat(this.agentToShow.data.totalSellingSales.totalSalePrice)).toFixed(2)
                : 0.00;
            this.totalSellingCost = agentToShow && agentToShow.data.totalSellingSales.totalSellingCost
                ? parseFloat(this.agentToShow.data.totalSellingSales.totalSellingCost).toFixed(2)
                : 0.00;
            this.totalSalePrice = agentToShow && agentToShow.data.totalSellingSales.totalSalePrice
                ? parseFloat(this.agentToShow.data.totalSellingSales.totalSalePrice).toFixed(2)
                : 0.00;
        });

        this.agentShowService.allOperations.subscribe({
            next: (ops: Operation[]) => {

                this.items = ops;
                this.dataSource.data = this.items;
            }
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.agentShowService.getAgentOperationData(params['id']).then();
        });
    }

    /**
     * @method applyFilter
     * @param event
     */
    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
