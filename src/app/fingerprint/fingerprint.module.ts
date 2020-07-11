import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FingerprintPageRoutingModule } from './fingerprint-routing.module';

import { FingerprintPage } from './component/fingerprint.page';
import {ToolbarModule} from '../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FingerprintPageRoutingModule,
        ToolbarModule,
        ReactiveFormsModule
    ],
  declarations: [FingerprintPage]
})
export class FingerprintPageModule {}
