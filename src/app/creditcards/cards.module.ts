import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CardsPageRoutingModule} from './cards-routing.module';

import {CardsPage} from './component/cards.page';
import {ToolbarModule} from '../shared/component/toolbar-page/toolbar.module';
import {MaterialModule} from '../material.module';
import {EmptyComponent} from '../shared/component/empty-page/empty.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CardsPageRoutingModule,
        ToolbarModule,
        MaterialModule,
    ],
    exports: [
        EmptyComponent
    ],
    declarations: [CardsPage, EmptyComponent]
})
export class CardsPageModule {
}
