import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SalesPageRoutingModule} from './sales-routing.module';

import {SalesPage} from './sales.page';
import {ToolbarModule} from '../../includes/toolbar/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SalesPageRoutingModule,
        ToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [SalesPage]
})
export class SalesPageModule {
}
