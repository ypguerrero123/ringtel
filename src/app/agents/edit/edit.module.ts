import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditPageRoutingModule} from './edit-routing.module';

import {EditPage} from './component/edit.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPageRoutingModule,
        ToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [EditPage]
})
export class EditPageModule {
}
