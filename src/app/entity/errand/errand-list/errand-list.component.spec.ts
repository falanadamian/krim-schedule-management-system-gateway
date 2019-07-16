import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandListComponent } from './errand-list.component';

describe('ErrandListComponent', () => {
  let component: ErrandListComponent;
  let fixture: ComponentFixture<ErrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
