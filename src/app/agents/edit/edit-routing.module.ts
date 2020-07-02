import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditPage} from './component/edit.page';

const routes: Routes = [
    {
        path: '',
        component: EditPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditPageRoutingModule {
}
