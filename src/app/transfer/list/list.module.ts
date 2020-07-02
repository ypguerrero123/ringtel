import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListPageRoutingModule} from './list-routing.module';

import {ListPage} from './component/list.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {MatTableModule} from '@angular/material/table';
import {CardsPageModule} from '../../creditcards/cards.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule,
        ToolbarModule,
        MatTableModule,
        CardsPageModule
    ],
    declarations: [ListPage]
})
export class ListPageModule {
}
