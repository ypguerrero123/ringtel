import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FingerprintPage } from './fingerprint.page';

describe('FingerprintPage', () => {
  let component: FingerprintPage;
  let fixture: ComponentFixture<FingerprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FingerprintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FingerprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
