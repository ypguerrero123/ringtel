import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Contacts} from '@ionic-native/contacts/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {DatePipe} from '@angular/common';

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
        Keyboard,
        DatePipe,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
