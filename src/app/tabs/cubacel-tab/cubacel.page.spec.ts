import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';

import {CubacelPage} from './cubacel.page';

describe('CubacelPage', () => {
    let component: CubacelPage;
    let fixture: ComponentFixture<CubacelPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CubacelPage],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CubacelPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
