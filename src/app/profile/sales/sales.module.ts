import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SalesPageRoutingModule} from './sales-routing.module';

import {SalesPage} from './component/sales.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

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
