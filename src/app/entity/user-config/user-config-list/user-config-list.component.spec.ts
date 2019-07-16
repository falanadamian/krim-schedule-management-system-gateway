import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigListComponent } from './user-config-list.component';

describe('UserConfigListComponent', () => {
  let component: UserConfigListComponent;
  let fixture: ComponentFixture<UserConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
