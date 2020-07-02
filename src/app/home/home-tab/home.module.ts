import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';
import {HomeContainerComponentModule} from './container/home-container.module';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomeContainerComponentModule,
        RouterModule.forChild([{path: '', component: HomePage}]),
        ToolbarModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
