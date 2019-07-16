import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleManagementListComponent } from './schedule-management-list.component';

describe('ScheduleManagementListComponent', () => {
  let component: ScheduleManagementListComponent;
  let fixture: ComponentFixture<ScheduleManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
