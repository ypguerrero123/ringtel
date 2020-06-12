import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';

import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from "@angular/router";
import {AppService} from "./services/app.service";
import {Constants} from "./config/constants";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private router: Router,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private screenOrientation: ScreenOrientation,
        private appService: AppService,
        private fcm: FCM,
    ) {
        this.initializeApp();
    }

    /**
     * @method initializeApp
     */
    private initializeApp() {

        //this.appService.verifyInitRedirect().then();

        this.platform.ready().then(() => {

            this.appService.setStorage(Constants.IS_ANDROID, this.platform.is('android'), false).then();
            this.appService.setStorage(Constants.IS_IOS, this.platform.is('ios'), false).then();
            this.appService.setStorage(Constants.IS_MOBIL_WEB, (this.platform.is('mobileweb') || this.platform.is('desktop')), false).then();

            if (!(this.platform.is('mobileweb') || this.platform.is('desktop'))) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then();
                this.statusBar.styleDefault();

                this.fcm.getToken().then(token => {
                    this.appService.saveTokenDevice(token);
                });

                this.fcm.onTokenRefresh().subscribe(token => {
                    this.appService.saveTokenDevice(token);
                });

                setTimeout(() => {
                    this.splashScreen.hide();
                }, 2000);

            }

        });
    }

}
