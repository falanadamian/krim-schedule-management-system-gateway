import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLimitListComponent } from './class-limit-list.component';

describe('ClassLimitListComponent', () => {
  let component: ClassLimitListComponent;
  let fixture: ComponentFixture<ClassLimitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLimitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLimitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
