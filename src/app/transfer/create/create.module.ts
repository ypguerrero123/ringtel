import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreatePageRoutingModule} from './create-routing.module';

import {CreatePage} from './component/create.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [CreatePage]
})
export class CreatePageModule {
}
