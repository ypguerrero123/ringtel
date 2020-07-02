import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RefreshComponent} from './refresh.component';

describe('RefreshComponent', () => {
    let component: RefreshComponent;
    let fixture: ComponentFixture<RefreshComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RefreshComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(RefreshComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
