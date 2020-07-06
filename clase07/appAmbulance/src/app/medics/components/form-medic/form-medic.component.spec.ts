import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedicComponent } from './form-medic.component';

describe('FormMedicComponent', () => {
  let component: FormMedicComponent;
  let fixture: ComponentFixture<FormMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
