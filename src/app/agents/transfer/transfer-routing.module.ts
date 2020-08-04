import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPage } from './component/transfer.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
