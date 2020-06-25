import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AlertController, LoadingController, PickerController, ToastController} from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {Shopping} from '../model/shopping';
import {SecurityService} from './security/security.service';
import {StripeService} from './stripe/stripe.service';
import {SecurityVars} from './security/security.vars';
import {ShoppingVars} from './shopping/shopping.vars';
import {OperationVars} from './operation/operation.vars';
import {StripeVars} from './stripe/stripe.vars';
import {ProfileService} from './profile/profile.service';
import {OperationService} from './operation/operation.service';
import {ShoppingService} from './shopping/shopping.service';
import {User} from '../model/user';
import {Constants} from '../config/constants';
import {Messages} from '../config/messages';
import {AppRoutes} from '../config/routes';
import {ProfileVars} from './profile/profile.vars';
import {FormGroup} from '@angular/forms';
import {Contacts} from '@ionic-native/contacts/ngx';
import {ContactService} from './native-plugins/contact.service';
import {TransferVars} from './transfer/transfer.vars';
import {TransferService} from './transfer/transfer.service';
import {ContactInterface} from '../model/contact';
import {AgentsVars} from './agents/agents.vars';
import {AgentsService} from './agents/agents.service';
import {ContactVars} from './native-plugins/contact.vars';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    //------------COMMON VARS-----------------------//
    public appRoutes = AppRoutes;

    constructor(public toastController: ToastController,
                public loadingController: LoadingController,
                public localNotifications: LocalNotifications,
                public pickerController: PickerController,
                public alertController: AlertController,
                public contacts: Contacts,
                public http: HttpClient,
                public storage: Storage,
                public router: Router,
                public secvars: SecurityVars,
                public shvars: ShoppingVars,
                public opvars: OperationVars,
                public stvars: StripeVars,
                public profvars: ProfileVars,
                public transfvars: TransferVars,
                public agentsVars: AgentsVars,
                public contactVars: ContactVars
    ) {
    }

    //-------------------AGENT API-----------------//

    /**
     * @method getAllAgents
     */
    public async getAllAgents() {
        await (new AgentsService(this)).getAllAgents();
    }

    /**
     * @method getAgent
     * @param agentId
     */
    public async getAgent(agentId) {
        await (new AgentsService(this)).getAgent(agentId);
    }

    /**
     * @method createAgent
     * @param data
     */
    public async createAgent(data) {
        await (new AgentsService(this)).createAgent(data);
    }

    /**
     * @method editAgent
     * @param agentId
     * @param data
     */
    public async editAgent(agentId, data) {
        await (new AgentsService(this)).editAgent(agentId, data);
    }

    /**
     * @method deleteAgent
     * @param agentId
     */
    public async deleteAgent(agentId) {
        await (new AgentsService(this)).deleteAgent(agentId);
    }

    /**
     * @method getAgentOperationData
     * @param agentId
     * @param start
     * @param end
     */
    public async getAgentOperationData(agentId, start, end) {
        await (new AgentsService(this)).getAgentOperationData(agentId, start, end);
    }

    //------------------TRANSFER CREDIT API--------//

    /**
     * @method getAllTransfer
     * @param page
     * @param concat
     */
    public async getAllTransfer(page, concat: boolean = false) {
        await (new TransferService(this)).getAllTransfer(page, concat);
    }

    /**
     * @method searchAgents
     * @param data
     */
    public async searchAgents(data) {
        await (new TransferService(this)).searchAgents(data);
    }

    /**
     * @method transferCredit
     * @param data
     * @param agentTo
     */
    public async transferCredit(agentTo, data) {
        await (new TransferService(this)).transferCredit(agentTo, data);
    }

    //------------------CONTACT API----------------//

    /**
     * @method contactsList
     * @param contactsName
     */
    public async contactsList(contactsName: ContactInterface[] = []) {
        await (new ContactService(this)).contactsList(contactsName);
    }

    /**
     * @method filterContactName
     * @param contactsName
     * @param value
     */
    public filterContactName(contactsName: ContactInterface[], value: string) {
        return (new ContactService(this)).filterContactName(contactsName, value);
    }

    /**
     * @method optionSelected
     * @param contactsName
     * @param name
     */
    public optionSelected(contactsName: ContactInterface[], name: string) {
        return (new ContactService(this)).optionSelected(contactsName, name);
    }

    //------------------PROFILE API----------------//

    /**
     * @method getProfile
     * @param start
     * @param end
     */
    public async getProfile(start, end) {
        await (new ProfileService(this)).getProfile(start, end);
    }

    /**
     * @method updateProfile
     * @param pathParameter
     * @param newData
     */
    public async updateProfile(pathParameter: string, newData: {}) {
        await (new ProfileService(this)).updateProfile(pathParameter, newData);
    }

    /**
     * @method updateToken
     * @param userHasUpdate
     */
    public async updateToken(userHasUpdate: boolean = true) {
        (new ProfileService(this)).updateToken(userHasUpdate).then();
    }

    /**
     * @method confirmDisableAccount
     */
    public async confirmDisableAccount() {
        await (new ProfileService(this)).confirmDisableAccount();
    }

    //------------------AUTH API-------------------//

    /**
     * @method login
     * @param data
     */
    public async login(data: any) {
        await (new SecurityService(this)).login(data);
    }

    /**
     * @method logout
     */
    public async logout() {
        await (new SecurityService(this)).logout();
    }

    /**
     * @method recovery
     * @param data
     */
    public async recovery(data: {}) {
        await (new SecurityService(this)).recovery(data);
    }

    /**
     * @method register
     * @param data
     */
    public async register(data: any) {
        return await (new SecurityService(this)).register(data);
    }

    /**
     * @method repeatOTP
     */
    public async repeatOTP(data: {} = null) {
        await (new SecurityService(this)).repeatOTP(data);
    }

    /**
     * @method verifyOTP
     * @param otp
     */
    public async verifyOTP(otp: string) {
        await (new SecurityService(this)).verifyOTP(otp);
    }

    /**
     * @method getUser
     * @param userHasUpdate
     */
    public async getUser(userHasUpdate: boolean = true) {
        return await (new SecurityService(this)).getUser(userHasUpdate);
    }

    /**
     * @method setUser
     * @param resp
     * @param userHasUpdate
     */
    public async setUser(resp: User = null, userHasUpdate: boolean = true) {
        return await (new SecurityService(this)).setUser(resp, userHasUpdate);
    }

    //------------------STRIPE API-----------------//

    /**
     * @method updateAgentBalance
     */
    public async updateAgentBalance() {
        await (new StripeService(this)).updateAgentBalance();
    }

    /**
     * @method getPaymentMethods
     */
    public async getAllPaymentMethods() {
        await (new StripeService(this)).getAllPaymentMethods();
    }

    /**
     * @method detachPaymentMethod
     * @param paymentId
     */
    public async detachPaymentMethod(paymentId) {
        await (new StripeService(this)).detachPaymentMethod(paymentId);
    }

    /**
     * @method getAllCustomerCharges
     */
    public async getAllCustomerCharges() {
        await (new StripeService(this)).getAllCustomerCharges();
    }

    //------------------SHOPPING AND RECHARGE API----------------//

    /**
     * @method showOperation
     * @param opId
     */
    public async showOperation(opId) {
        await (new OperationService(this)).showOperation(opId);
    }

    /**
     * @method getAllOperations
     * @param start
     * @param end
     * @param page
     */
    public async getAllOperations(start, end, page) {
        await (new OperationService(this)).getAllOperations(start, end, page);
    }

    /**
     * @method confirmShoppingData
     * @param form
     * @param action
     * @param service
     */
    public async confirmShoppingData(form: FormGroup, action, service) {
        await (new OperationService(this)).confirmShoppingData(form, action, service);
    }

    /**
     * @method confirmShoppingData
     * @param form
     * @param action
     * @param service
     */
    public async confirmShoppingDataFile(form: FormGroup, action, service) {
        await (new OperationService(this)).confirmShoppingDataFile(form, action, service);
    }

    /**
     *@method sendOneShopping
     * @param shopping
     */
    public async sendOneShopping(shopping: Shopping) {
        await (new OperationService(this)).sendOneShopping(shopping);
    }

    /**
     * @method sendOneShoppingToPreSale
     * @param shopping
     */
    public async sendOneShoppingToPreSale(shopping: Shopping) {
        await (new OperationService(this)).sendOneShoppingToPreSale(shopping);
    }

    /**
     * @method getAllRechargesByServiceSlug
     * @param slug
     */
    public async getAllRechargesByServiceSlug(slug: string) {
        await (new OperationService(this)).getAllRechargesByServiceSlug(slug);
        await (new OperationService(this)).verifyPreSaleActive();
    }

    /**
     * @method getOneRechargeByIdAndService
     * @param priceId
     * @param service
     * @param user
     */
    public async getOneRechargeByIdAndService(priceId: number, service: string, user: User) {
        return await (new OperationService(this)).getOneRechargeByIdAndService(priceId, service, user);
    }


    //------------------SHOPPING CART--------------//

    /**
     * @method getAllShoppings
     * @param showSpinner
     */
    public async getAllShoppings(showSpinner: boolean = true) {
        await (new ShoppingService(this)).getAllShoppings(showSpinner);
    }

    /**
     * @method sendAllShopping
     */
    public async sendAllShopping() {
        await (new ShoppingService(this)).sendAllShopping();
    }

    /**
     * @method addOneShoppingToCart
     * @param shopping
     */
    public async addOneShoppingToCart(shopping: Shopping) {
        await (new ShoppingService(this)).addOneShoppingToCart(shopping);
    }

    /**
     * @method removeOneShopping
     * @param shopping
     */
    public async removeOneShopping(shopping: Shopping) {
        await (new ShoppingService(this)).removeOneShopping(shopping);
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
        return this.secvars.user && this.secvars.user.broker_post_sale;
    }

    /**
     * @method isAdmin
     */
    public isAdmin() {
        return this.secvars.user && this.secvars.user.role_admin;
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
            duration: 2000,
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
     * @method choicePhoneCode
     */
    public async choicePhoneCode() {
        const picker = await this.pickerController.create({
            columns: [{
                name: 'choice_ccodes',
                options: this.profvars.getColumnOptions(this.secvars.user ? this.secvars.user.phoneCodeNumber : '+53')
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
                        this.profvars.updateCCodePhoneValue(value.choice_ccodes.value);
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
