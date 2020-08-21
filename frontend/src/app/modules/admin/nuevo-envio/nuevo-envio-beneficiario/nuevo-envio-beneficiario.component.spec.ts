import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEnvioBeneficiarioComponent } from './nuevo-envio-beneficiario.component';

describe('NuevoEnvioBeneficiarioComponent', () => {
  let component: NuevoEnvioBeneficiarioComponent;
  let fixture: ComponentFixture<NuevoEnvioBeneficiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEnvioBeneficiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEnvioBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
