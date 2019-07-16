import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListViewComponent } from './schedule-list-view.component';

describe('ScheduleListViewComponent', () => {
  let component: ScheduleListViewComponent;
  let fixture: ComponentFixture<ScheduleListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
