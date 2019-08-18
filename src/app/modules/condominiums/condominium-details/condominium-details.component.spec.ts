import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominiumDetailsComponent } from './condominium-details.component';

describe('CondominiumDetailsComponent', () => {
  let component: CondominiumDetailsComponent;
  let fixture: ComponentFixture<CondominiumDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondominiumDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondominiumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
