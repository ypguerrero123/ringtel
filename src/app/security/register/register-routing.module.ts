import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterPage} from './component/register.page';

const routes: Routes = [
    {
        path: '',
        component: RegisterPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterPageRoutingModule {
}
