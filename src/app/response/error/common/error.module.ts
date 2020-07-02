import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ErrorRoutingModule} from './error-routing.module';

import {ErrorPage} from './component/error.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ErrorRoutingModule
    ],
    declarations: [ErrorPage]
})
export class ErrorPageModule {
}
