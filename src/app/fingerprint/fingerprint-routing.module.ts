import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FingerprintPage } from './component/fingerprint.page';

const routes: Routes = [
  {
    path: '',
    component: FingerprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FingerprintPageRoutingModule {}
