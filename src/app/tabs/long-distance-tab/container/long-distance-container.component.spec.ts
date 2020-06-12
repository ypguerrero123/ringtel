import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LongDistanceContainerComponent} from './long-distance-container.component';

describe('LongDistanceContainerComponent', () => {
    let component: LongDistanceContainerComponent;
    let fixture: ComponentFixture<LongDistanceContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LongDistanceContainerComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(LongDistanceContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
