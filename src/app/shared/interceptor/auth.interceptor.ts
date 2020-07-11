import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from '../service/app.service';
import {Constants} from '../config/constants';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private token: string = null;

    /**
     * Constructor
     * @param appService
     */
    constructor(private appService: AppService) {
    }

    /**
     * @method intercept
     * @param req
     * @param next
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = this.addAuthenticationToken(req);

        return next.handle(req);
    }

    /**
     * @method addAuthenticationToken
     * @param request
     */
    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

        this.encryptUsingAES256();

        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if (!this.token) {
            return request;
        }

        return request.clone({
            setHeaders: {
                'accessToken': this.token,
            }
        });
    }

    /**
     * @method encryptUsingAES256
     */
    private encryptUsingAES256() {

        const timestamp = Date.now();

        const CryptoJSAesJson = {
            'stringify': function(cipherParams) {
                let j = {
                    ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
                    iv: null, s: null

                };
                if (cipherParams.iv) {
                    j.iv = cipherParams.iv.toString();
                }
                if (cipherParams.salt) {
                    j.s = cipherParams.salt.toString();
                }
                return JSON.stringify(j).replace(/\s/g, '');
            }
        };

        let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify({accessToken: timestamp}), Constants.ENCRIPTION_KEY, {
                iv: Constants.IV_KEY,
                format: CryptoJSAesJson
            });

        this.token = encrypted.toString();
    }
}
