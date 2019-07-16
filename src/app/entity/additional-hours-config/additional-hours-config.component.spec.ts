import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalHoursConfigComponent } from './additional-hours-config.component';

describe('AdditionalHoursConfigComponent', () => {
  let component: AdditionalHoursConfigComponent;
  let fixture: ComponentFixture<AdditionalHoursConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalHoursConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalHoursConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
