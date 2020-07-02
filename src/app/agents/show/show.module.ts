import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShowPageRoutingModule} from './show-routing.module';

import {ShowPage} from './component/show.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowPageRoutingModule,
        ToolbarModule
    ],
    declarations: [ShowPage]
})
export class ShowPageModule {
}
