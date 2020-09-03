import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Recharge, RechargeEntity} from '../../shared/model/recharge';
import {FormGroup} from '@angular/forms';
import {User} from '../../shared/model/user';
import {SendShoppingResponse, Shopping, ShoppingFormEntity} from '../../shared/model/shopping';
import {Messages} from '../../shared/config/messages';
import {Utils} from '../../shared/utils/utils';
import {map} from 'rxjs/operators';
import {Constants} from '../../shared/config/constants';
import {ShoppingService} from '../../shopping/service/shopping.service';

@Injectable({
    providedIn: 'root'
})
export class RechargeService {

    //-------------RECHARGE VARS--------------------//
    public cubacelRecharges: Recharge[];
    public nautaRecharges: Recharge[];
    public longDistanceRecharges: Recharge[];
    public hasLoadRecharges = false;
    public preSalesActive = false;
    public allSalesActive = false;

    /**
     * Constructor
     * @param appService
     * @param shoppingService
     */
    constructor(private shoppingService: ShoppingService, public appService: AppService) {
    }

    /**
     * @method verifyPreSaleActive
     */
    public async verifyPreSaleActive() {
        await this.appService.post(
            `es/api/v1/recharge/verify/pre-sales/status`
        ).subscribe(
            (resp: any) => {
                this.preSalesActive = resp.presales ? resp.presales : false;
                this.allSalesActive = resp.sales ? resp.sales : false;
            }, () => {
                this.preSalesActive = false;
                this.allSalesActive = false;
            }
        );
    }

    /**
     * @method getAllRechargesByServiceSlug
     * @param slug
     */
    public async getAllRechargesByServiceSlug(slug: string) {
        const user = this.appService.user;
        await this.appService.post(`es/api/v1/recharge/${user.administrator_group_id}/${slug}/code-values`)
            .pipe(map((resp: Recharge[]) => resp.map(rechargeData => new RechargeEntity(rechargeData, slug, user))))
            .subscribe(
                (resp: Recharge[]) => {
                    switch (slug) {
                        case Constants.NAUTA_SLUG:
                            this.nautaRecharges = resp;
                            break;
                        case Constants.LONG_DISTANCE_SLUG:
                            this.longDistanceRecharges = resp;
                            break;
                        default:
                            this.cubacelRecharges = resp;
                            break;
                    }
                }, () => {
                    this.appService.presentToast(Messages.NOT_AVAILABLE).then();
                }, () => {
                    this.hasLoadRecharges = true;
                }
            );
    }

    /**
     * @method getRecharge
     * @param priceId
     * @param service
     * @param user
     */
    public async getRecharge(priceId: number, service: string, user: User) {
        let price: Recharge = null;

        if (service == 'nauta') {
            await this.nautaRecharges.forEach((p: Recharge) => {
                if (p.id == priceId) {
                    price = new RechargeEntity(p, service, user);
                }
            });
        } else if (service == 'long-distance') {
            await this.longDistanceRecharges.forEach((p: Recharge) => {
                if (p.id == priceId) {
                    price = p;
                }
            });
        } else {
            await this.cubacelRecharges.forEach((p: Recharge) => {
                if (p.id == priceId) {
                    price = new RechargeEntity(p, service, user);
                }
            });
        }

        return price;
    }

    //----------------FORMS SERVICES------------------------//

    /**
     * @method confirmShoppingData
     * @param form
     * @param action
     * @param service
     */
    public async confirmShoppingData(form: FormGroup, action, service) {

        const user: User = this.appService.user;
        const ccodPhoneValue: string = this.appService.ccodePhoneValue;
        const recharge: Recharge = await this.getRecharge(form.value.recharge, service, user);
        const shopping: Shopping = new ShoppingFormEntity(form.value, recharge, service, ccodPhoneValue);

        if (parseInt(user.balance) == 0) {

            if (!this.appService.isPostSale()) {
                return this.appService.navigateToUrl(this.appService.appRoutes.APP_STRIPE);
            } else {

                let message = `${Messages.CREDIT_NOT_VALID} $${user.balance} < $${(service == Messages.CUBACEl_LOWER ? user.sale_price_cubacel : user.sale_price_nauta)}`;

                return this.appService.presentToast(message);
            }

        }

        const alert = await this.appService.alertController.create({
            header: Messages.CONFIRM_DATA,
            message: form.value.client
                ? `<hr/><p>Nombre: ${shopping.client}</p><hr/><p>Cuenta: ${shopping.account}</p><hr/><p>Recarga: ${recharge.slug}</p>`
                : `<hr/><p>Cuenta: ${shopping.account}</p><hr/><p>Recarga: ${recharge.slug}</p>`,
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
                                this.addOneShoppingToCart(shopping).then();
                                break;
                            case 3:
                                this.sendOneShoppingToPreSale(shopping).then();
                                break;
                            default:
                                this.sendOneShopping(shopping).then();
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
    private async sendOneShopping(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'account': shopping.account,
                'client': shopping.client,
                'service': shopping.service
            });

            this.appService.post(
                `es/api/v1/recharge/${this.appService.userType()}/${this.appService.user.id}/code/${shopping.recharge.id}/index`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {

                    this.appService.dismissLoading(loading).then(() => {

                        this.appService.setUser(resp.agent, true).then(() => {

                            const message = resp.success == true
                                ? Messages.SUCCESS_ACTION
                                : (resp.errorMessage == Messages.PLEASE_WAIT_TWO_MINUTES
                                    ? Messages.PLEASE_WAIT_TWO_MINUTES
                                    : Messages.ERROR_PLEASE_TRY_LATER);

                            this.appService.presentToast(message).then();
                        });

                    });

                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                });
        });
    }

    /**
     * @method addOneShoppingToCart
     * @param shopping
     */
    private async addOneShoppingToCart(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'account': shopping.account,
                'client': shopping.client,
                'service': shopping.service
            });

            this.appService.post(
                `es/api/v1/shopping/${this.appService.userType()}/${this.appService.user.id}/recharge/${shopping.recharge.id}/create`, data
            ).subscribe(
                (resp: Shopping[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.shoppingService.allShoppings.next(resp);
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                });
        });
    }

    /**
     * @method sendOneShoppingToPreSale
     * @param shopping
     */
    private async sendOneShoppingToPreSale(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'account': shopping.account,
                'client': shopping.client,
            });

            this.appService.post(
                `es/api/v1/recharge/${this.appService.userType()}/${this.appService.user.id}/code/${shopping.recharge.id}/pre/sale`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp.agent, true).then();
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                });
        });
    }


    //-----------------LOTE FILE SERVICE-------------------------------//

    /**
     * @method proccessLote
     * @param allData
     * @param rechargePriceId
     * @param action
     * @param service
     */
    public async proccessLote(allData: string[], rechargePriceId, action, service) {
        if (allData.length == 0 || (allData.length > 0 && allData[0] == '') || allData.length > 100) {

            return this.appService.presentToast(
                allData.length == 0 || (allData.length > 0 && allData[0] == '')
                    ? Messages.FORM_LOTE_EMPTY : Messages.FORM_MAX_FILE_100
            ).then();

        }
        Utils.validLote(allData).then(async (valid: any) => {

            if (valid !== true) {
                return this.appService.presentToast(`${Messages.FORM_LOTE_NOT_VALID} ${valid}`).then();
            }

            Utils.parseLote(allData).then(async (finalLote: string[]) => {

                const user: User = this.appService.user;
                const recharge: Recharge = await this.getRecharge(rechargePriceId, service, user);

                const salePriceCubacel = parseFloat(user.sale_price_cubacel);

                if (parseInt(user.balance) == 0 || parseInt(user.balance) < (finalLote.length * salePriceCubacel)) {
                    return this.appService.presentToast(`${Messages.CREDIT_NOT_VALID} $${user.balance} < $${(finalLote.length * salePriceCubacel).toFixed(2)}`);
                }

                const alert = await this.appService.alertController.create({
                    header: Messages.CONFIRM_DATA,
                    message: `<hr/><p>Cantidad de números: ${finalLote.length}</p><hr/><p>Recarga: ${recharge.slug}</p><hr/><p>Precio del lote: $${(finalLote.length * salePriceCubacel).toFixed(2)}</p>`,
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
                                        this.addOneShoppingToCartByLote(recharge, finalLote, service).then();
                                        break;
                                    case 3:
                                        this.sendOneShoppingToPreSaleByLote(recharge, finalLote).then();
                                        break;
                                    default:
                                        this.sendOneShoppingByLote(recharge, finalLote).then();
                                        break;
                                }
                            }
                        }
                    ]
                });
                await alert.present();

            });
        });
    }

    /**
     * @method sendOneShoppingToPreSaleByLote
     * @param recharge
     * @param allData
     */
    private async sendOneShoppingToPreSaleByLote(recharge: Recharge, allData: string[]) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'all_data': allData
            });

            this.appService.post(
                `es/api/v1/recharge-file/${this.appService.userType()}/${this.appService.user.id}/code/${recharge.id}/pre/sale`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp.agent, true).then();
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                });
        });
    }

    /**
     * @method addOneShoppingToCartByLote
     * @param recharge
     * @param allData
     * @param service
     */
    private async addOneShoppingToCartByLote(recharge: Recharge, allData: string[], service) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            const data = Utils.getFormData({
                'all_data': allData,
                'service': service
            });

            this.appService.post(
                `es/api/v1/recharge-file/${this.appService.userType()}/${this.appService.user.id}/code-recharge/${recharge.id}/send-to-shopping`, data
            ).subscribe(
                (resp: Shopping[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.shoppingService.allShoppings.next(resp);
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                });
        });
    }

    /**
     * @method sendOneShoppingByLote
     * @param recharge
     * @param allData
     */
    private async sendOneShoppingByLote(recharge: Recharge, allData: string[]) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            const data = Utils.getFormData({
                'all_data': allData
            });

            this.appService.post(
                `es/api/v1/recharge-file/${this.appService.userType()}/${this.appService.user.id}/code/${recharge.id}/index`, data
            ).subscribe(
                (resp: SendShoppingResponse) => {
                    this.appService.dismissLoading(loading).then(() => {

                        this.appService.setUser(resp.agent, true).then(() => {

                            const message = resp.success == true
                                ? Messages.SUCCESS_ACTION
                                : Messages.ERROR_PLEASE_TRY_LATER;

                            this.appService.presentToast(message).then();
                        });

                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(Utils.pareseError(err)).then();
                    });
                });

        });
    }


}
