import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShoppingRoutingModule} from './shopping-routing.module';

import {ShoppingPage} from './shopping.page';
import {ToolbarModule} from '../includes/toolbar/toolbar.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {CardsPageModule} from "../creditcards/cards.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShoppingRoutingModule,
        ToolbarModule,
        MatTableModule,
        MatSortModule,
        CardsPageModule
    ],
    declarations: [ShoppingPage]
})
export class ShoppingModule {
}
