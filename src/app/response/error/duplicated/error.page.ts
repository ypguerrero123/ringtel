import {Component, OnInit} from '@angular/core';
import {Messages} from '../../../config/messages';

@Component({
    selector: 'app-error',
    templateUrl: './error.page.html',
    styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

    /**
     * @var string
     */
    public messageText: string = Messages.PLEASE_WAIT_TWO_MINUTES;

    /**
     * Constructor ErrorPage
     */
    constructor() {
    }

    ngOnInit() {

    }

}
