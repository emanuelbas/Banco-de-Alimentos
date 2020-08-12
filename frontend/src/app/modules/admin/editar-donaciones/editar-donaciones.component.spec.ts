import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDonacionesComponent } from './editar-donaciones.component';

describe('EditarDonacionesComponent', () => {
  let component: EditarDonacionesComponent;
  let fixture: ComponentFixture<EditarDonacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDonacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
