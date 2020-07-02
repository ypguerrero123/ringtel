import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SalesPage} from './component/sales.page';

const routes: Routes = [
    {
        path: '',
        component: SalesPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SalesPageRoutingModule {
}
