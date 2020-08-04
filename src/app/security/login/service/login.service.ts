import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../../../shared/model/user';
import {AppRoutes} from '../../../shared/config/routes';
import {Messages} from '../../../shared/config/messages';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(public appService: AppService) {
    }

    /**
     * @method login
     * @param data
     */
    public async login(data: any) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });

            this.appService.post('es/api/v1/security/login', data, headers).subscribe(
                (resp: User) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp).then(() => {
                            return resp.broker_post_sale && (!resp.selling_cost_cubacel || !resp.selling_cost_nauta)
                                ? this.appService.navigateToUrl(AppRoutes.APP_EDIT_SALES)
                                : this.appService.navigateToUrl(AppRoutes.APP_HOME_PAGE);
                        });
                    });
                },
                err => {
                    this.appService.setUser(null, false).then(() => {
                        this.appService.dismissLoading(loading).then(() => {
                            this.appService.presentToast(
                                err.status === 401 ? Messages.INVALID_CREDENTIAL : Messages.ERROR_PLEASE_TRY_LATER
                            ).then();
                        });
                    });

                });
        });
    }
}
