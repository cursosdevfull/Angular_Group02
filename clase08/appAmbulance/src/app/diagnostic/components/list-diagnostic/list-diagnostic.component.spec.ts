import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiagnosticComponent } from './list-diagnostic.component';

describe('ListDiagnosticComponent', () => {
  let component: ListDiagnosticComponent;
  let fixture: ComponentFixture<ListDiagnosticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDiagnosticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
