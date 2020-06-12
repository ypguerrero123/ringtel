import {AppService} from '../app.service';
import {SendShoppingResponse, Shopping, ShoppingFormEntity} from '../../model/shopping';
import {Constants} from '../../config/constants';
import {Messages} from '../../config/messages';
import {Recharge, RechargeEntity} from '../../model/recharge';
import {Utils} from "../utils/utils";
import {FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {User} from "../../model/user";
import {Operation} from "../../model/operation";

/**
 * OperationService
 */
export class OperationService {

    /**
     * Constructor SendShoppingResponse
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method showOperation
     * @param opId
     */
    public async showOperation(opId) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(`es/api/v1/operation/${this.appService.userType()}/${this.appService.secvars.user.id}/show/${opId}`)
                .subscribe((resp: Operation) => {
                        this.appService.opvars.operation = resp;
                    },
                    err => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER,
                                'dark').then();
                        });

                    },
                    () => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.opvars.loadedOperation = true;
                        });
                    });
        });

    }

    /**
     * @method getAllOperations
     * @param start
     * @param end
     * @param page
     */
    public async getAllOperations(start, end, page) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/operation/${this.appService.userType()}/${this.appService.secvars.user.id}/date/${start}/to/${end}/filter/${page}`
            ).subscribe((resp: Operation[]) => {
                    this.appService.opvars.setAllOperations(resp);
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER,
                            'dark').then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method confirmShoppingData
     * @param form
     * @param action
     * @param service
     */
    public async confirmShoppingData(form: FormGroup, action, service) {

        const user: User = this.appService.secvars.user;
        const ccodPhoneValue: string = this.appService.profvars.ccodePhoneValue;
        const recharge: Recharge = await this.appService.getOneRechargeByIdAndService(form.value.recharge, service, user);
        const shopping: Shopping = new ShoppingFormEntity(form.value, recharge, service, ccodPhoneValue);

        if (parseInt(user.balance) == 0) {
            if (!this.appService.isPostSale()) {
                return this.appService.navigateToUrl(this.appService.appRoutes.APP_STRIPE);
            } else {
                return this.appService.presentToast(Messages.CREDIT_NOT_VALID);
            }
        }

        const alert = await this.appService.alertController.create({
            header: Messages.CONFIRM_DATA,
            message: `<h2>${form.value.client}</h2>
                                <h3>${recharge.slug}</h3>
                                <p>${shopping.account}</p>`,
            buttons: [
                {
                    text: Messages.CANCEL,
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: `${action == 1 ? Messages.RECHARGE_NOW : (action == 2 ? Messages.SEND_TO_SHOPPING_CART : Messages.RECHARGE_IN_PROMOTION)}`,
                    handler: () => {
                        switch (action) {
                            case 2:
                                this.appService.addOneShoppingToCart(shopping).then();
                                break;
                            case 3:
                                this.appService.sendOneShoppingToPreSale(shopping).then();
                                break;
                            default:
                                this.appService.sendOneShopping(shopping).then();
                                break;
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    /**
     * @method sendOneShopping
     * @param shopping
     */
    public async sendOneShopping(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'account': shopping.account,
                'client': shopping.client,
                'service': shopping.service
            });

            this.appService.post(
                `es/api/v1/recharge/${this.appService.userType()}/${this.appService.secvars.user.id}/code/${shopping.recharge.id}/index`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {
                    this.appService.setUser(resp.agent, true).then(() => {

                        const message = resp.success == true
                            ? Messages.SUCCESS_ACTION
                            : (resp.errorMessage == Messages.PLEASE_WAIT_TWO_MINUTES
                                ? Messages.PLEASE_WAIT_TWO_MINUTES
                                : Messages.ERROR_PLEASE_TRY_LATER);

                        this.appService.presentToast(message, resp.success == true ? 'primary' : 'dark').then(() => {
                            if (resp.success == true) {
                                this.appService.pushLocalNotification(`Cuenta ${shopping.account} ${shopping.recharge.slug} recargada correctamente.`).then();
                            }
                        });
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER, 'dark').then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then();
                });
        });
    }

    /**
     * @method sendOneShoppingToPreSale
     * @param shopping
     */
    public async sendOneShoppingToPreSale(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'account': shopping.account,
                'client': shopping.client,
                'service': shopping.service
            });

            this.appService.post(
                `es/api/v1/recharge/${this.appService.userType()}/${this.appService.secvars.user.id}/code/${shopping.recharge.id}/pre/sale`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {
                    this.appService.setUser(resp.agent, true).then();
                },
                err => {
                    let error = err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER;
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(error, 'dark').then();
                    });
                },
                () => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Messages.SUCCESS_ACTION, 'primary').then();
                    });
                });
        });
    }

    /**
     * @method getAllRechargesByServiceSlug
     * @param slug
     */
    public async getAllRechargesByServiceSlug(slug: string) {
        const user = this.appService.secvars.user;
        await this.appService.post(`es/api/v1/recharge/${user.administrator_group_id}/${slug}/code-values`)
            .pipe(map((resp: Recharge[]) => resp.map(rechargeData => new RechargeEntity(rechargeData, slug, user))))
            .subscribe(
                (resp: Recharge[]) => {
                    switch (slug) {
                        case Constants.NAUTA_SLUG:
                            this.appService.opvars.nautaRecharges = resp;
                            break;
                        case Constants.LONG_DISTANCE_SLUG:
                            this.appService.opvars.longDistanceRecharges = resp;
                            break;
                        default:
                            this.appService.opvars.cubacelRecharges = resp;
                            break;
                    }
                    this.appService.opvars.hasLoadRecharges = true;
                }, () => {
                    this.appService.presentToast(Messages.NOT_AVAILABLE, 'dark').then();
                }, () => {
                    this.appService.opvars.hasLoadRecharges = true;
                }
            );
    }

    /**
     * @method verifyPreSaleActive
     */
    public async verifyPreSaleActive() {
        await this.appService.post(`es/api/v1/recharge/verify/pre-sales/status`)
            .subscribe(
                (resp: any) => {
                    this.appService.opvars.preSalesActive = resp.presales ? resp.presales : false;
                }, () => {
                    this.appService.opvars.preSalesActive = false;
                }
            );
    }

    /**
     * @method getOneRechargeByIdAndService
     * @param priceId
     * @param service
     * @param user
     */
    public async getOneRechargeByIdAndService(priceId: number, service: string, user: User) {
        let price: Recharge = null;

        if (service == 'nauta') {
            await this.appService.opvars.nautaRecharges.forEach((p) => {
                if (p.id == priceId) {
                    price = new RechargeEntity(p, service, user);
                }
            });
        } else if (service == 'long-distance') {
            await this.appService.opvars.longDistanceRecharges.forEach((p) => {
                if (p.id == priceId) {
                    price = p;
                }
            });
        } else {
            await this.appService.opvars.cubacelRecharges.forEach((p) => {
                if (p.id == priceId) {
                    price = new RechargeEntity(p, service, user);
                }
            });
        }

        return price;
    }

}
