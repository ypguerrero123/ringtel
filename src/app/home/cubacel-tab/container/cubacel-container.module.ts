import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CubacelContainerComponent} from './cubacel-container.component';
import {HomeContainerComponentModule} from '../../home-tab/container/home-container.module';
import {MaterialModule} from '../../../material.module';
import {MaterialFileInputModule} from 'ngx-material-file-input';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, HomeContainerComponentModule, MaterialModule, MaterialFileInputModule],
    declarations: [CubacelContainerComponent],
    exports: [CubacelContainerComponent]
})
export class CubacelContainerComponentModule {
}
