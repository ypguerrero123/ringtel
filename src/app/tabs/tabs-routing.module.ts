import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'recharge',
        component: TabsPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./home-tab/home.module').then(m => m.HomePageModule)
                    }
                ]
            },
            {
                path: 'cubacel',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./cubacel-tab/cubacel.module').then(m => m.CubacelPageModule)
                    }
                ]
            },
            {
                path: 'nauta',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./nauta-tab/nauta.module').then(m => m.NautaPageModule)
                    }
                ]
            },
            {
                path: 'long-distance',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./long-distance-tab/long-distance.module').then(m => m.LongDistancePageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/operation/cubacel',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/operation/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
