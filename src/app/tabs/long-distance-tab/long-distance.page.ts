import {Component} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-tab3',
    templateUrl: 'long-distance.page.html',
    styleUrls: ['long-distance.page.scss']
})
export class LongDistancePage {

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

}
