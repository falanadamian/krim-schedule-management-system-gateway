import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignatureListViewComponent } from './user-signature-list-view.component';

describe('UserSignatureListViewComponent', () => {
  let component: UserSignatureListViewComponent;
  let fixture: ComponentFixture<UserSignatureListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSignatureListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignatureListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
