import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PasswordPage} from './component/password.page';

const routes: Routes = [
    {
        path: '',
        component: PasswordPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PasswordPageRoutingModule {
}
