import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LongDistancePage} from './long-distance.page';

describe('LongDistancePage', () => {
    let component: LongDistancePage;
    let fixture: ComponentFixture<LongDistancePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LongDistancePage],
            imports: [IonicModule.forRoot(), LongDistancePage]
        }).compileComponents();

        fixture = TestBed.createComponent(LongDistancePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
