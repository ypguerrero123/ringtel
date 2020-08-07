import {AppService} from '../../shared/service/app.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(public appService: AppService) {
    }
}
