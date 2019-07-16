import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGeneralInformationListComponent } from './module-general-information-list.component';

describe('ModuleGeneralInformationListComponent', () => {
  let component: ModuleGeneralInformationListComponent;
  let fixture: ComponentFixture<ModuleGeneralInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGeneralInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGeneralInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
