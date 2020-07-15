import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShowPageRoutingModule} from './show-routing.module';

import {ShowPage} from './component/show.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowPageRoutingModule,
        ToolbarModule,
        MatTabsModule,
        MatTableModule
    ],
    declarations: [ShowPage]
})
export class ShowPageModule {
}
