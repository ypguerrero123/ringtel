import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HistoryPageRoutingModule} from './list-routing.module';

import {ListPage} from './component/list.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {HomeContainerComponentModule} from '../../home/home-tab/container/home-container.module';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {CardsPageModule} from '../../creditcards/cards.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HistoryPageRoutingModule,
        ToolbarModule,
        HomeContainerComponentModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        CardsPageModule
    ],
    declarations: [ListPage]
})
export class HistoryPageModule {
}
