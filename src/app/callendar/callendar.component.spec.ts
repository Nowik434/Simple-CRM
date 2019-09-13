import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallendarComponent } from './callendar.component';

describe('CallendarComponent', () => {
  let component: CallendarComponent;
  let fixture: ComponentFixture<CallendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
