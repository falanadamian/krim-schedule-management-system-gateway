import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalHoursConfigListComponent } from './additional-hours-config-list.component';

describe('AdditionalHoursConfigListComponent', () => {
  let component: AdditionalHoursConfigListComponent;
  let fixture: ComponentFixture<AdditionalHoursConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalHoursConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalHoursConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
