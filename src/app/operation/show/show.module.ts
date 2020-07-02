import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShowRoutingModule} from './show-routing.module';

import {ShowPage} from './component/show.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowRoutingModule,
        ToolbarModule
    ],
    declarations: [ShowPage]
})
export class OperationPageModule {
}
