import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomeContainerComponent} from './home-container.component';
import {MaterialModule} from "../../../material.module";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, MaterialModule],
    declarations: [HomeContainerComponent],
    exports: [HomeContainerComponent]
})
export class HomeContainerComponentModule {
}
