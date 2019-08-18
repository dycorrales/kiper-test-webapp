import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentDetailsListComponent } from './resident-details-list.component';

describe('ResidentDetailsListComponent', () => {
  let component: ResidentDetailsListComponent;
  let fixture: ComponentFixture<ResidentDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
