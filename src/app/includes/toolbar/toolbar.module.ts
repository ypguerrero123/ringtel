import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ToolbarComponent} from './toolbar.component';
import {RefreshComponent} from "../refresh/refresh.component";

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [ToolbarComponent, RefreshComponent],
    exports: [ToolbarComponent, RefreshComponent]
})
export class ToolbarModule {
}
