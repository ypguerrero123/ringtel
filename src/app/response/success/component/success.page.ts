import {Component, OnInit} from '@angular/core';
import {Messages} from '../../../shared/config/messages';

@Component({
    selector: 'app-success',
    templateUrl: './success.page.html',
    styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

    /**
     * @var string
     */
    public messageText: string = Messages.SUCCESS_ACTION;

    /**
     * Constructor SuccessPage
     */
    constructor() {
    }

    ngOnInit() {
    }

}
