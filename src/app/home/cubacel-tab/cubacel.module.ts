import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CubacelPage} from './cubacel.page';
import {CubacelContainerComponentModule} from './container/cubacel-container.module';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        CubacelContainerComponentModule,
        RouterModule.forChild([{path: '', component: CubacelPage}]),
        ToolbarModule,
    ],
    declarations: [CubacelPage]
})
export class CubacelPageModule {
}
