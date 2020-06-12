import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Shopping} from '../../model/shopping';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

    @Input() title: string;
    @Input() active: string;

    /**
     * @var number
     */
    public totalShoppingItems: number = 0;

    /**
     * @var bool
     */
    public readingShooping: boolean = true;

    /**
     * COnstructror ToolbarComponent
     * @param appService
     */
    constructor(public appService: AppService) {
    }

    ngOnInit() {
        this.appService.shvars.AllShoppings.subscribe((shoppings: Shopping[]) => {
            this.readingShooping = true;
            this.totalShoppingItems = shoppings.length;
            this.readingShooping = false;
        });
        this.appService.getAllShoppings(false).then();
    }

    /**
     * @method visible
     * @param valid
     */
    public visible(valid: string[]) {
        return valid.includes(this.active);
    }

}
