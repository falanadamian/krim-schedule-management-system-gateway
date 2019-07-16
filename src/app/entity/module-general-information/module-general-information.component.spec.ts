import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGeneralInformationComponent } from './module-general-information.component';

describe('ModuleGeneralInformationComponent', () => {
  let component: ModuleGeneralInformationComponent;
  let fixture: ComponentFixture<ModuleGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
