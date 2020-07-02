import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ShoppingPage} from './shopping.page';

describe('ShoppingPage', () => {
    let component: ShoppingPage;
    let fixture: ComponentFixture<ShoppingPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShoppingPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ShoppingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
