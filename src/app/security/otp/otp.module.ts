import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OtpPageRoutingModule} from './otp-routing.module';
import {OtpPage} from './otp.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OtpPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [OtpPage]
})
export class OtpPageModule {
}
