import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessingPendingPageRoutingModule } from './processing-pending-routing.module';

import { ProcessingPendingPage } from './component/processing-pending.page';
import {ToolbarModule} from '../../shared/component/toolbar-page/toolbar.module';
import {CardsPageModule} from '../../creditcards/cards.module';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProcessingPendingPageRoutingModule,
        ToolbarModule,
        CardsPageModule,
        MatTableModule,
        MatTabsModule
    ],
  declarations: [ProcessingPendingPage]
})
export class ProcessingPendingPageModule {}
