import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicComponent } from './list-medic.component';

describe('ListMedicComponent', () => {
  let component: ListMedicComponent;
  let fixture: ComponentFixture<ListMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
