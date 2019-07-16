import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLimitComponent } from './class-limit.component';

describe('ClassLimitComponent', () => {
  let component: ClassLimitComponent;
  let fixture: ComponentFixture<ClassLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
