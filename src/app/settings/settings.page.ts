import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(public appService: AppService) {
    }

    ngOnInit() {
    }

}
