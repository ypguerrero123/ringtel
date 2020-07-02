import {Component} from '@angular/core';
import {AppService} from '../../shared/service/app.service';

@Component({
    selector: 'app-tab4',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    constructor(public appService: AppService) {
    }

}
