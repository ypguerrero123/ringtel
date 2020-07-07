import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AlertController, LoadingController, PickerController, ToastController} from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {Constants} from '../config/constants';
import {Messages} from '../config/messages';
import {AppRoutes} from '../config/routes';
import {Contact, Contacts} from '@ionic-native/contacts/ngx';
import {Subject} from 'rxjs';
import {User, UserDataResponse} from '../model/user';
import {Ccodes} from '../model/ccodes';
import * as ccodes from '../../shared/config/ccodes.json';
import {ContactInterface} from '../model/contact';
import {Utils} from '../utils/utils';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    //------------COMMON VARS-----------------------//
    public appRoutes = AppRoutes;
    public ccodes: Ccodes[] = (ccodes as any).default;
    public ccodePhoneValue: string = '+53';

    //-------------AUTH VARS-----------------------//
    public userHasUpdate: Subject<User> = new Subject<User>();
    public userOperationData: Subject<UserDataResponse> = new Subject<UserDataResponse>();
    public user: User = null;

    /**
     * Constructor
     * @param toastController
     * @param loadingController
     * @param localNotifications
     * @param pickerController
     * @param alertController
     * @param contacts
     * @param http
     * @param storage
     * @param router
     */
    constructor(public toastController: ToastController,
                public loadingController: LoadingController,
                public localNotifications: LocalNotifications,
                public pickerController: PickerController,
                public alertController: AlertController,
                public contacts: Contacts,
                public http: HttpClient,
                public storage: Storage,
                public router: Router
    ) {
    }

    /**
     * @method setUser
     * @param user
     * @param userHasUpdate
     */
    public async setUser(user: User = null, userHasUpdate: boolean = true) {
        await this.setStorage(Constants.USER_AUTH_KEY, user);
        if (userHasUpdate) {
            this.userHasUpdate.next(user);
        }
        this.user = user;
    }

    /**
     * @method getUser
     */
    public async getUser() {
        this.user = await this.getStorage(Constants.USER_AUTH_KEY);
        return this.user;
    }

    /**
     * @method getProfile
     * @param start
     * @param end
     */
    public async getProfile(start, end) {
        this.post(
            `es/api/v1/profile/${this.userType()}/${this.user.id}/${start}/${end}/get-profile`
        ).subscribe(
            (resp: UserDataResponse) => {
                this.setUser(resp.agent, false).then(() => {
                    this.userOperationData.next(resp);
                });
            },
            () => {
                this.presentToast(Messages.ERROR_PLEASE_TRY_LATER).then();
            });
    }

    /**
     * @method updateToken
     * @param userHasUpdate
     */
    public async updateToken(userHasUpdate: boolean = true) {
        if (this.user) {
            this.getStorage(Constants.TOKEN_DEVICE_KEY, false).then((token) => {
                if (!token) {
                    return;
                }
                this.post(
                    `es/api/v1/profile/${this.userType()}/${this.user.id}/token-device`, Utils.getFormData({'token': token})
                ).subscribe((resp: User) => {
                    this.setUser(resp, userHasUpdate);
                });
            });
        }
    }

    /**
     * @method logout
     */
    public async logout() {
        this.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.deleteStorage(Constants.USER_AUTH_KEY).then(() => {
                this.router.navigate(['/login']).then(() => {
                    this.dismissLoading(loading).then(() => {
                        this.setUser(null, false);
                    });
                });
            });
        });
    }

    /**
     * @method contactsList
     * @method contactsName
     */
    public async contactsList(contactsName: ContactInterface[] = []) {
        const isMobilWeb = await this.getStorage(Constants.IS_MOBIL_WEB, false);
        if (!isMobilWeb) {

            const options = {
                filter: '',
                multiple: true,
                hasPhoneNumber: true
            };

            this.contacts.find(['*'], options).then((res: Contact[]) => {
                res.forEach((item: Contact, key: number) => {
                    contactsName.push({
                        id: key,
                        name: item.displayName ? item.displayName : (item.name && item.name.formatted ? item.name.formatted : ''),
                        phone: Utils.strFixPhoneNumber(item.phoneNumbers[0].value)
                    });
                });
            });
        }
    }

    /**
     * @method filterContactName
     * @param contactsName
     * @param value
     */
    public filterContactName(contactsName: ContactInterface[], value: string): ContactInterface[] {

        if (value.length == 0) {
            return [];
        }

        const lowerFilterName = value.toLowerCase();
        return contactsName.filter((option: ContactInterface) => {
            return option.name.toLowerCase().includes(lowerFilterName) || option.phone.toLowerCase().includes(lowerFilterName);
        });
    }

    /**
     * @method optionSelected
     * @param contactsName
     * @param name
     */
    public async optionSelected(contactsName: ContactInterface[], name) {
        return contactsName.filter((option: ContactInterface) => {
            return option.name == name;
        });
    }

    //------------------COMMONS METHDOS API-------------------------//

    /**
     * @method post
     * @param endpoint
     * @param data
     * @param headers
     */
    public post(endpoint: string, data: any = {}, headers: any = {}) {
        return this.http.post(environment.apiURL + endpoint, data, {headers: headers});
    }

    /**
     * @method isPostSale
     */
    public isPostSale() {
        return this.user && this.user.broker_post_sale;
    }

    /**
     * @method isAdmin
     */
    public isAdmin() {
        return this.user && this.user.role_admin;
    }

    /**
     * @method userType
     */
    public userType() {
        return this.isAdmin() ? 'admin' : 'agent';
    }

    /**
     * @method navigateToUrl
     * @param url
     */
    public navigateToUrl(url: string) {
        this.router.navigate([url], {state: {updateInfos: true}}).then(() => {
            if (url == AppRoutes.APP_SUCCESS || url == AppRoutes.APP_ERROR || url == AppRoutes.APP_ERROR_DUPLICATED) {
                setTimeout(() => {
                    this.navigateToUrl(AppRoutes.APP_HOME_PAGE);
                }, 3000);
            }
        });
    }

    /**
     * @method presentToast
     * @param message
     * @param color
     */
    public async presentToast(message: string, color: string = 'dark') {
        const toast = await this.toastController.create({
            header: Messages.NOTIFICATION,
            message: message,
            position: 'top',
            color: color,
            duration: 5000,
            buttons: [
                {
                    text: Messages.DONE,
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        await toast.present();
    }

    /**
     * @method presentLoading
     * @param show
     */
    public async presentLoading(show: boolean = true) {

        if (!show) {
            return null;
        }

        const loading = await this.loadingController.create({
            animated: true,
            message: 'Espere...',
            duration: 60000
        });
        await loading.present();
        return loading;
    }

    /**
     * @method dismissLoading
     */
    public async dismissLoading(loading: HTMLIonLoadingElement = null) {
        if (loading) {
            await loading.dismiss();
        }
    }

    /**
     * @method pushLocalNotification
     * @param text
     * @param key
     */
    public async pushLocalNotification(text: string, key: number = null) {
        const isAndroid = await this.getStorage(Constants.IS_ANDROID, false);
        const isIOS = await this.getStorage(Constants.IS_IOS, false);
        const isMobilWeb = await this.getStorage(Constants.IS_MOBIL_WEB, false);

        if (!isMobilWeb) {
            // Schedule a single notification
            this.localNotifications.schedule({
                id: key && key > 0 ? key : 1,
                title: Messages.APP_NAME,
                text: text,
                sound: isAndroid ? 'file://sound.mp3' : (isIOS ? 'file://beep.caf' : null),
                vibrate: true,
                lockscreen: true,
                data: {secret: Constants.LOCAL_NOTIFICATION_KEY}
            });
        }
    }

    /**
     * @method getColumnOptions
     * @param phoneCodeNumber
     */
    private getColumnOptions(phoneCodeNumber: string) {
        let options = [];
        this.ccodes.forEach((ccodes: Ccodes) => {
            options.push({
                text: `${ccodes.name} (+${ccodes.phone_code})`,
                value: `+${ccodes.phone_code}`,
                selected: phoneCodeNumber == `+${ccodes.phone_code}`
            });
        });
        return options;
    }

    /**
     * @method updateCCodePhoneValue
     * @param ccodePhoneValue
     */
    public updateCCodePhoneValue(ccodePhoneValue: string) {
        this.ccodePhoneValue = ccodePhoneValue;
    }

    /**
     * @method choicePhoneCode
     */
    public async choicePhoneCode() {
        const picker = await this.pickerController.create({
            columns: [{
                name: 'choice_ccodes',
                options: this.getColumnOptions(this.user ? this.user.phoneCodeNumber : '+53')
            }],
            keyboardClose: false,
            buttons: [
                {
                    text: Messages.CANCEL,
                    role: 'cancel'
                },
                {
                    text: Messages.DONE,
                    handler: (value: any) => {
                        this.updateCCodePhoneValue(value.choice_ccodes.value);
                    }
                }
            ]
        });

        await picker.present();
    }

    /**
     * @method setStorage
     * @param storageKey
     * @param value
     * @param encripted
     */
    public async setStorage(storageKey: string, value: any, encripted: boolean = true) {
        const encryptedValue = encripted === true ? btoa(escape(JSON.stringify(value))) : value;
        await this.storage.set(storageKey, encryptedValue);
    }

    /**
     * @method getStorage
     * @param storageKey
     * @param encripted
     */
    public async getStorage(storageKey: string, encripted: boolean = true) {
        const resp = await this.storage.get(storageKey);
        if (resp) {
            return encripted === true ? JSON.parse(unescape(atob(resp))) : resp;
        }
        return false;
    }

    /**
     * @method deleteStorage
     * @param storageKey
     */
    public async deleteStorage(storageKey: string) {
        await this.storage.remove(storageKey);
    }

    /**
     * @method clearStorage
     */
    public async clearStorage() {
        await this.storage.clear();
    }

    /**
     * @method isFirstTimeLoad
     */
    public async verifyInitRedirect() {
        const userLoggedIn = await this.getStorage(Constants.USER_AUTH_KEY);
        if (userLoggedIn) {
            return this.router.navigateByUrl(AppRoutes.APP_HOME_PAGE).then();
        }
        const otpProccess = await this.getStorage(Constants.REGISTER_OTP_PROCCESS, false);
        if (otpProccess && otpProccess === true) {
            return this.router.navigateByUrl('/otp').then();
        }
    }

    /**
     * @method saveTokenDevice
     * @param token
     */
    public saveTokenDevice(token) {
        this.setStorage(Constants.TOKEN_DEVICE_KEY, token, false).then();
    }
}
