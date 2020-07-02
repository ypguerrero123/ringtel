import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OperationShowService} from '../service/operation-show.service';

@Component({
    selector: 'app-recharge-detail',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

    /**
     * Constructor
     * @param route
     * @param operationShowService
     */
    constructor(private route: ActivatedRoute, public operationShowService: OperationShowService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.operationShowService.showOperation(params['id']).then();
        });
    }

}
