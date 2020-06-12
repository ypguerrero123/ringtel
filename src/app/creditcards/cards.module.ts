import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CardsPageRoutingModule} from './cards-routing.module';

import {CardsPage} from './cards.page';
import {ToolbarModule} from "../includes/toolbar/toolbar.module";
import {MaterialModule} from "../material.module";
import {EmptyComponent} from "../includes/empty/empty.component";

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
