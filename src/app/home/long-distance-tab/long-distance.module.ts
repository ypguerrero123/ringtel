import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LongDistancePage} from './long-distance.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {LongDistanceContainerModule} from './container/long-distance-container.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: LongDistancePage}]),
        ToolbarModule,
        LongDistanceContainerModule
    ],
    declarations: [LongDistancePage]
})
export class LongDistancePageModule {
}
