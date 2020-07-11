import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Constants} from '../../shared/config/constants';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {User} from '../../shared/model/user';
import {Messages} from '../../shared/config/messages';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FingerPrintService {

    //-------------PROFILE GENERAL ERROR VARS------------------//
    public successFinger: Subject<any> = new Subject<any>();
    public errorFinger: Subject<any> = new Subject<any>();

    public errorPath: string = null;
    public errorMessage: string = null;

    public userConfigurated = false;
    public isFingerAvailable = false;

    /**
     * Constructor
     * @param faio
     * @param appService
     */
    constructor(private faio: FingerprintAIO, public appService: AppService) {
    }

    /**
     * @method configureFingerPrint
     * @param data
     */
    public async configureFingerPrint(data: FormData) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.user.id}/configure-finger-print`, data)
                .subscribe(
                    (resp: User) => {
                        this.appService.setUser(resp).then(() => {
                            this.setUserConfiguration(resp.enabledFingerPrint).then();
                            this.appService.setStorage(Constants.DATA_FINGER_PRINT, {
                                'username': this.appService.user.email,
                                'password': data.get('password')
                            });
                            this.userConfigurated = resp.enabledFingerPrint;
                        });
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            if (err.status == 400) {
                                this.setErrorVars(err.error.path, err.error.error);
                            } else {
                                this.appService.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
                            }
                        });
                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(Messages.SUCCESS_ACTION).then(() => {
                                this.setErrorVars(null, null);
                            });
                        });
                    });

        });
    }

    /**
     * @method userHasConfigutared
     */
    public async userHasConfigutared() {

        const cfg = await this.appService.getStorage(Constants.FINGER_PRINT);
        this.userConfigurated = cfg && cfg == true;

        const isMobilWeb = await this.appService.getStorage(Constants.IS_MOBIL_WEB, false);

        if (!isMobilWeb) {
            this.faio.isAvailable().then(() => {
                this.isFingerAvailable = true;
            }).catch(() => {
                this.isFingerAvailable = false;
            });
        }

        return this.userConfigurated;
    }

    /**
     * @method setUserConfiguration
     * @param enabled
     */
    public async setUserConfiguration(enabled: boolean = false) {
        this.appService.setStorage(Constants.FINGER_PRINT, enabled).then();
    }

    /**
     * @method showFingerprintAuthDlg
     */
    public showFingerprintAuthDlg() {
        if (this.isFingerAvailable && this.userConfigurated) {
            this.faio.show({
                title: `${Messages.APP_NAME} inicio de sesión biométrico`, // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
                disableBackup: false,  // optional | default: false
            })
                .then((result: any) => {
                    this.successFinger.next(result);
                })
                .catch((error: any) => {
                    this.errorFinger.next(error);
                });
        } else {
            this.appService.presentToast(!this.isFingerAvailable ? Messages.APP_FINGET_NO_PERMITED : Messages.APP_FINGET_NO_CONFIGURATED).then();
        }
    }

    /**
     * @method setErrorVars
     * @param path
     * @param message
     */
    private setErrorVars(path, message) {
        this.errorPath = path;
        this.errorMessage = message;
    }
}
