import {Component, OnInit} from '@angular/core';
import {Messages} from '../../../../shared/config/messages';

@Component({
    selector: 'app-error',
    templateUrl: './error.page.html',
    styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

    /**
     * @var string
     */
    public messageText: string = Messages.ERROR_PLEASE_TRY_LATER;

    /**
     * Constructor ErrorPage
     */
    constructor() {
    }

    ngOnInit() {

    }

}
