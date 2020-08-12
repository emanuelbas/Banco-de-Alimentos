import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDonacionesComponent } from './buscar-donaciones.component';

describe('BuscarDonacionesComponent', () => {
  let component: BuscarDonacionesComponent;
  let fixture: ComponentFixture<BuscarDonacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarDonacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
