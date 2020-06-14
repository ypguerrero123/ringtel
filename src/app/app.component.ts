import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {Network} from '@ionic-native/network/ngx';
import {FCM} from '@ionic-native/fcm/ngx';
import {Router} from '@angular/router';
import {AppService} from './services/app.service';
import {Constants} from './config/constants';
import {Messages} from './config/messages';

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
        private network: Network
    ) {
        this.initializeApp();
    }

    /**
     * @method initializeApp
     */
    private initializeApp() {

        this.appService.verifyInitRedirect().then();

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

                // watch network for a disconnection
                this.network.onDisconnect().subscribe(() => {
                    this.appService.presentToast(Messages.OFFLINE_NETWORK).then();
                });

                this.network.onConnect().subscribe(() => {
                    this.appService.presentToast(Messages.ONLINE_NETWORK, 'primary').then();
                });

                setTimeout(() => {

                    this.splashScreen.hide();

                }, 2000);

                setTimeout(() => {
                    this.appService.contactsList().then();
                }, 5000);

            }

        });
    }

}
