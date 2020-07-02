import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ErrorPage} from './component/error.page';

const routes: Routes = [
    {
        path: '',
        component: ErrorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorRoutingModule {
}
