import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {AppRoutes} from '../../shared/config/routes';
import {User} from '../../shared/model/user';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

    public appRoutes = AppRoutes;

    public user: User;

    constructor(public contactService: ContactService) {
    }

    ngOnInit() {
        this.user = this.contactService.appService.user;
    }

}
