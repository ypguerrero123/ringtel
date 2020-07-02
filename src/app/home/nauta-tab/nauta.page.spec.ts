import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';

import {NautaPage} from './nauta.page';

describe('Tab2Page', () => {
    let component: NautaPage;
    let fixture: ComponentFixture<NautaPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NautaPage],
            imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
        }).compileComponents();

        fixture = TestBed.createComponent(NautaPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
