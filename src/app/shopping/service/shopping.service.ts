import {Injectable} from '@angular/core';
import {AppService} from '../../shared/service/app.service';
import {Subject} from 'rxjs';
import {SendShoppingResponse, SendShoppingResponseEntity, Shopping, ShoppingResponseEntity} from '../../shared/model/shopping';
import {map} from 'rxjs/operators';
import {Messages} from '../../shared/config/messages';
import {AppRoutes} from '../../shared/config/routes';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {

    //-------------SHOPPING CART--------------------//
    public allShoppings: Subject<Shopping[]> = new Subject<Shopping[]>();

    /**
     * Consteructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method getAllShoppings
     */
    public async getAllShoppings(showSpinner: boolean = true) {
        this.appService.presentLoading(showSpinner).then((loading: HTMLIonLoadingElement) => {

            const user = this.appService.user;

            this.appService.post(
                `es/api/v1/shopping/${this.appService.userType()}/${user.id}/index`
            ).pipe(map((resp: Shopping[]) => resp.map(shoppingData => new ShoppingResponseEntity(shoppingData, user)))
            ).subscribe((resp: Shopping[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.allShoppings.next(resp);
                    });
                },
                err => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                });
        });
    }

    /**
     * @method sendAllShopping
     */
    public async sendAllShopping() {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            const user = this.appService.user;
            this.appService.post(
                `es/api/v1/shopping/${this.appService.userType()}/${user.id}/send-all`
            ).pipe(map((resp: SendShoppingResponse) => new SendShoppingResponseEntity(resp, user)))
                .subscribe(
                    (resp: SendShoppingResponse) => {
                        this.appService.dismissLoading(loading).then(() => {

                            this.appService.setUser(resp.agent, true).then(() => {

                                setTimeout(() => {

                                    this.allShoppings.next(resp.shoppings);

                                }, 1000);

                                if (resp.shoppings.length == 0) {
                                    this.appService.navigateToUrl(AppRoutes.APP_SUCCESS);
                                }

                            });

                        });
                    },
                    (err) => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                        });
                    });
        });
    }

    /**
     * @method removeOneShopping
     * @param shopping
     */
    public async removeOneShopping(shopping: Shopping) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            this.appService.post(
                `es/api/v1/shopping/${this.appService.userType()}/${this.appService.user.id}/shopping/${shopping.id}/delete`
            ).subscribe(
                (resp: Shopping[]) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.allShoppings.next(resp);
                    });
                },
                (err) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.presentToast(err.error.detail ? err.error.detail : Messages.ERROR_PLEASE_TRY_LATER).then();
                    });
                },
                () => {
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then();
                });
        });
    }

}
