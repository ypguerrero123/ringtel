import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SettingsPageRoutingModule} from './settings-routing.module';

import {SettingsPage} from './component/settings.page';
import {ToolbarModule} from '../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingsPageRoutingModule,
        ToolbarModule
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule {
}
