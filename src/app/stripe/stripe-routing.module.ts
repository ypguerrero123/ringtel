import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StripePage} from './component/stripe.page';

const routes: Routes = [
    {
        path: '',
        component: StripePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StripePageRoutingModule {
}
