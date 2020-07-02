import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HomeContainerComponent} from './home-container.component';

describe('HomeContainerComponent', () => {
    let component: HomeContainerComponent;
    let fixture: ComponentFixture<HomeContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeContainerComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
