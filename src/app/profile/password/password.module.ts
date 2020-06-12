import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PasswordPageRoutingModule} from './password-routing.module';

import {PasswordPage} from './password.page';
import {ToolbarModule} from '../../includes/toolbar/toolbar.module';

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
