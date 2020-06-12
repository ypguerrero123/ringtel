import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NautaContainerComponent} from './nauta-container.component';

describe('NautaContainerComponent', () => {
    let component: NautaContainerComponent;
    let fixture: ComponentFixture<NautaContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NautaContainerComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(NautaContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
