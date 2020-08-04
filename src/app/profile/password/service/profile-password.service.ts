import {Injectable} from '@angular/core';
import {AppService} from '../../../shared/service/app.service';
import {User} from '../../../shared/model/user';
import {Messages} from '../../../shared/config/messages';
import {Constants} from '../../../shared/config/constants';

@Injectable({
    providedIn: 'root'
})
export class ProfilePasswordService {

    //-------------PROFILE PASSWORD ERROR VARS------------------//
    public errorPath: string = null;
    public errorMessage: string = null;

    /**
     * Constructor
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    /**
     * @method updatePassword
     * @param pathParameter
     * @param newData
     */
    public async updatePassword(pathParameter: string, newData: FormData) {
        this.appService.presentLoading().then((loading: HTMLIonLoadingElement) => {

            this.setErrorVars(null, null);

            this.appService.post(
                `es/api/v1/profile/${this.appService.userType()}/${this.appService.user.id}/${pathParameter}`, newData
            ).subscribe(
                (resp: User) => {
                    this.appService.dismissLoading(loading).then(() => {
                        this.appService.setUser(resp).then(() => {
                            if (resp.enabledFingerPrint) {
                                this.appService.setStorage(Constants.DATA_FINGER_PRINT, {
                                    'username': this.appService.user.email,
                                    'password': newData.get('newPassword')
                                });
                            }
                        });
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
                    this.appService.presentToast(Messages.SUCCESS_ACTION).then(() => {
                        this.setErrorVars(null, null);
                    });
                });
        });
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
