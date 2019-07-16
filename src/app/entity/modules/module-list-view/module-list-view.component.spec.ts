import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListViewComponent } from './module-list-view.component';

describe('ModuleListViewComponent', () => {
  let component: ModuleListViewComponent;
  let fixture: ComponentFixture<ModuleListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
