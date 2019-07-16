import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGeneralInformationListViewComponent } from './module-general-information-list-view.component';

describe('ModuleGeneralInformationListViewComponent', () => {
  let component: ModuleGeneralInformationListViewComponent;
  let fixture: ComponentFixture<ModuleGeneralInformationListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGeneralInformationListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGeneralInformationListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
