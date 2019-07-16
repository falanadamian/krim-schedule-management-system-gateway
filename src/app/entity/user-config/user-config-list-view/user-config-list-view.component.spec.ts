import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigListViewComponent } from './user-config-list-view.component';

describe('UserConfigListViewComponent', () => {
  let component: UserConfigListViewComponent;
  let fixture: ComponentFixture<UserConfigListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
