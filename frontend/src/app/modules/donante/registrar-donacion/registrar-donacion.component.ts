import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-registrar-donacion',
  templateUrl: './registrar-donacion.component.html',
  styleUrls: ['./registrar-donacion.component.css']
})
export class RegistrarDonacionComponent implements OnInit {

  constructor(private data:DataShareService) { }

  ngOnInit() {
    this.data.cambiarTitulo("Registrar donación");
  }

}
