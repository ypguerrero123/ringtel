import {Component, Input, OnInit} from '@angular/core';
import {Shopping} from '../../model/shopping';
import {ShoppingService} from '../../../shopping/service/shopping.service';

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
     * COnstructror
     * @param shoppingService
     */
    constructor(public shoppingService: ShoppingService) {
    }

    ngOnInit() {
        this.shoppingService.allShoppings.subscribe((shoppings: Shopping[]) => {
            this.readingShooping = true;
            this.totalShoppingItems = shoppings.length;
            this.readingShooping = false;
        });
        this.shoppingService.getAllShoppings(false).then();
    }

    /**
     * @method visible
     * @param valid
     */
    public visible(valid: string[]) {
        return valid.includes(this.active);
    }

}
