import {Component} from '@angular/core';
import {AppService} from '../../shared/service/app.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'nauta.page.html',
    styleUrls: ['nauta.page.scss']
})
export class NautaPage {

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

}
