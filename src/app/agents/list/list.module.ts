import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListPageRoutingModule} from './list-routing.module';

import {ListPage} from './component/list.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule,
        ToolbarModule
    ],
    declarations: [ListPage]
})
export class ListPageModule {
}
