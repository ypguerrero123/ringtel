import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NautaPage} from './nauta.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {NautaContainerModule} from './container/nauta-container.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: NautaPage}]),
        ToolbarModule,
        NautaContainerModule,
    ],
    declarations: [NautaPage]
})
export class NautaPageModule {
}
