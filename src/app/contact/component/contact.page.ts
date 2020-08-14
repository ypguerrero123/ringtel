import {Component, EventEmitter, NgZone, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {AppRoutes} from '../../shared/config/routes';
import {User} from '../../shared/model/user';
import {Utils} from '../../shared/utils/utils';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

    public appRoutes = AppRoutes;

    public user: User;

    public messages: any[];

    constructor(public contactService: ContactService) {
    }

    ngOnInit() {
        this.user = this.contactService.appService.user;


    }

    ionViewWillEnter() {
        //this.contactService.connect('topic-store-13');
    }

    ionViewWillLeave() {

    }

    public sendMessage() {
        /*const data = Utils.getFormData({
            'message': 'Hola soy yo',
            'owner': 'TIENDA',
            'name': this.user.name,
            'email': this.user.email
        });
        this.contactService.sendMessage('topic-store-13', data);*/
    }

}
