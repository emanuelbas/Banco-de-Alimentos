import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Beneficiario } from '../../../../_services/lbservice/models';  
import { BeneficiarioApi } from '../../../../_services/lbservice/services';

@Component({
  selector: 'app-nuevo-envio-seleccionar-donante',
  templateUrl: './nuevo-envio-seleccionar-donante.component.html',
  styleUrls: ['./nuevo-envio-seleccionar-donante.component.css']
})
export class NuevoEnvioSeleccionarDonanteComponent implements OnInit {

	form : FormGroup;
	beneficiario : Beneficiario;
	beneficiarios;

	@Input()  name: string;
  	@Output() enviarIdBeneficiario = new EventEmitter<string>();
    constructor(private api:BeneficiarioApi) {
		this.form = new FormGroup({
			beneficiario: new FormControl()
	    });
		api.find().subscribe((beneficiarios)=>{
			this.beneficiarios = beneficiarios;
		})

     }

    ngOnInit() {
    }

    enviarAlPadre(idBeneficiario:string){
    	this.enviarIdBeneficiario.emit(idBeneficiario);

    }

}
