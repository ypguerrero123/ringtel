import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcessingPendingPage } from './processing-pending.page';

describe('ProcessingPendingPage', () => {
  let component: ProcessingPendingPage;
  let fixture: ComponentFixture<ProcessingPendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingPendingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessingPendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
