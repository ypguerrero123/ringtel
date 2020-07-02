import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessingPendingPage } from './component/processing-pending.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessingPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessingPendingPageRoutingModule {}
