import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiagnosticComponent } from './form-diagnostic.component';

describe('FormDiagnosticComponent', () => {
  let component: FormDiagnosticComponent;
  let fixture: ComponentFixture<FormDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
