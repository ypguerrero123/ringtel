import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PasswordPageRoutingModule} from './password-routing.module';

import {PasswordPage} from './component/password.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PasswordPageRoutingModule,
        ToolbarModule,
        ReactiveFormsModule
    ],
    declarations: [PasswordPage]
})
export class PasswordPageModule {
}
