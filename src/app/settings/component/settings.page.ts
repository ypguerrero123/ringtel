import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../service/settings.service';
import {AppRoutes} from '../../shared/config/routes';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    public appRoutes = AppRoutes;

    /**
     * Constructor
     * @param settingsService
     */
    constructor(public settingsService: SettingsService) {
    }

    ngOnInit() {
    }

}
