import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Producto, ProductoApi, TipoProducto, TipoProductoApi, Categoria, CategoriaApi } from '../../../../_services/lbservice';


@Component({
  selector: 'app-stock-cargar-producto-individual',
  templateUrl: './stock-cargar-producto-individual.component.html',
  styleUrls: ['./stock-cargar-producto-individual.component.css']
})
export class StockCargarProductoIndividualComponent implements OnInit {

	form: FormGroup;
	fechaActual = new Date();
	producto: Producto;


	constructor(
		private router:Router,
		private productoApi:ProductoApi,
		private tipoApi:TipoProductoApi,
		private categoria:CategoriaApi
		)
	{ 
		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required]),
			categoria: new FormControl('', [Validators.required]),
			cant: new FormControl('', [Validators.required]),
			vto: new FormControl('', [Validators.required]),
			peso: new FormControl('', [Validators.required]),
      	});

      	//Estos serian los datos que quiero obtener del form
      	//y mandar a la api
		this.producto.cantidad;
		this.producto.vencimiento;
		this.producto.tipoProducto.nombre;
		this.producto.tipoProducto.categoria;
		this.producto.tipoProducto.peso;
	}

	ngOnInit() {
	}

}
