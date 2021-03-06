import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NautaContainerComponent} from './nauta-container.component';
import {HomeContainerComponentModule} from '../../home-tab/container/home-container.module';
import {MaterialModule} from '../../../material.module';


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, HomeContainerComponentModule, MaterialModule],
    declarations: [NautaContainerComponent],
    exports: [NautaContainerComponent]
})
export class NautaContainerModule {
}
