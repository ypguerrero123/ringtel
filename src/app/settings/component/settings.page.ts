import {Component, OnInit} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {SettingsService} from '../service/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    /**
     * Constructor
     * @param settingsService
     */
    constructor(public settingsService: SettingsService) {
    }

    ngOnInit() {
    }

}
