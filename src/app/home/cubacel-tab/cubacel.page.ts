import {Component} from '@angular/core';
import {AppService} from '../../shared/service/app.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'cubacel.page.html',
    styleUrls: ['cubacel.page.scss']
})
export class CubacelPage {

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

}
