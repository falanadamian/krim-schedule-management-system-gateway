import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitConfigListComponent } from './limit-config-list.component';

describe('LimitConfigListComponent', () => {
  let component: LimitConfigListComponent;
  let fixture: ComponentFixture<LimitConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
