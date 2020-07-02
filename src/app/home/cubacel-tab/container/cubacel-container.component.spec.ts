import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CubacelContainerComponent} from './cubacel-container.component';

describe('HomeContainerComponent', () => {
    let component: CubacelContainerComponent;
    let fixture: ComponentFixture<CubacelContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CubacelContainerComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CubacelContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
