import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignatureListComponent } from './user-signature-list.component';

describe('UserSignatureListComponent', () => {
  let component: UserSignatureListComponent;
  let fixture: ComponentFixture<UserSignatureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignatureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
