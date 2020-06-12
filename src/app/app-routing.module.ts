import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AppRoutes} from './config/routes';

const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    //----------SECURITY-----------//
    {
        path: AppRoutes.APP_LOGIN,
        loadChildren: () => import('./security/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: AppRoutes.APP_REGISTER,
        loadChildren: () => import('./security/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: AppRoutes.APP_RECOVERY,
        loadChildren: () => import('./security/recovery/recovery.module').then(m => m.RecoveryPageModule)
    },
    {
        path: AppRoutes.APP_OTP,
        loadChildren: () => import('./security/otp/otp.module').then(m => m.OtpPageModule),
        canActivate: [AuthGuard]
    },
    //---------RECHARGES APPLICATION-----------//
    {
        path: 'application',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthGuard]
    },
    //---------OTHERS ROUTES-------------------------//
    {
        path: AppRoutes.APP_SETTINGS,
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_RECHARGE_HISTORY,
        loadChildren: () => import('./operation/list/list.module').then(m => m.HistoryPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_RECHARGE_DETAIL,
        loadChildren: () => import('./operation/show/show.module').then(m => m.OperationPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_SHOPPING_CART,
        loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_STRIPE,
        loadChildren: () => import('./stripe/stripe.module').then(m => m.StripePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_EDIT_PROFILE,
        loadChildren: () => import('./profile/general/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_EDIT_PASSWORD,
        loadChildren: () => import('./profile/password/password.module').then(m => m.PasswordPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_SUCCESS,
        loadChildren: () => import('./response/success/success.module').then(m => m.SuccessPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_ERROR,
        loadChildren: () => import('./response/error/common/error.module').then(m => m.ErrorPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_ERROR_DUPLICATED,
        loadChildren: () => import('./response/error/duplicated/error.module').then(m => m.ErrorPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_CREDIT_CARD_DETAIL,
        loadChildren: () => import('./creditcards/cards.module').then(m => m.CardsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_TRANSFER_CREATE,
        loadChildren: () => import('./transfer/create/create.module').then(m => m.CreatePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_TRANSFER_LIST,
        loadChildren: () => import('./transfer/list/list.module').then(m => m.ListPageModule),
        canActivate: [AuthGuard]
    },
    //---------AGENTS ROUTES-----------//
    {
        path: AppRoutes.APP_AGENTS_LIST,
        loadChildren: () => import('./agents/list/list.module').then(m => m.ListPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_AGENTS_SHOW,
        loadChildren: () => import('./agents/show/show.module').then(m => m.ShowPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_AGENTS_EDIT,
        loadChildren: () => import('./agents/edit/edit.module').then(m => m.EditPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_AGENTS_CREATE,
        loadChildren: () => import('./agents/create/create.module').then(m => m.CreatePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: AppRoutes.APP_EDIT_SALES,
        loadChildren: () => import('./profile/sales/sales.module').then(m => m.SalesPageModule),
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
