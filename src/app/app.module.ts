import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Contacts} from '@ionic-native/contacts/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {Network} from '@ionic-native/network/ngx';
import {DatePipe} from '@angular/common';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {AuthInterceptor} from './shared/interceptor/auth.interceptor';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        Contacts,
        CallNumber,
        LocalNotifications,
        Network,
        FirebaseX,
        DatePipe,
        FingerprintAIO,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
