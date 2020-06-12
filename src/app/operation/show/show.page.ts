import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-recharge-detail',
    templateUrl: './show.page.html',
    styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {

    /**
     * Constructor ShowPage
     * @param appService
     * @param route
     */
    constructor(public appService: AppService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.appService.showOperation(params['id']).then();
        });
    }

}
