import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Donacion, DonacionApi, Producto, ProductoApi, TipoProducto, TipoProductoApi, Categoria, CategoriaApi } from '../../../../_services/lbservice';


@Component({
  selector: 'app-stock-cargar-productos-donacion',
  templateUrl: './stock-cargar-productos-donacion.component.html',
  styleUrls: ['./stock-cargar-productos-donacion.component.css']
})
export class StockCargarProductosDonacionComponent implements OnInit {

	form: FormGroup;
	fechaActual = new Date();
	producto: Producto;
	categorias: Categoria[];

	//Donaciones que no esten desarmadas ni enviadas en una donacion
	donacionesNuevas : Donacion[];
	productosPrecargados:Producto[];

	constructor(
		private router:Router,
		private productoApi:ProductoApi,
		private tipoApi:TipoProductoApi,
		private categoriaApi:CategoriaApi,
		private donacionApi:DonacionApi
		//apiDonacion
		) {

		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required]),
			categoria: new FormControl('', [Validators.required]),
			cant: new FormControl('', [Validators.required]),
			vto: new FormControl('', [Validators.required]),
			peso: new FormControl('', [Validators.required]),
      	});

		this.categoriaApi.find().subscribe((categoriaArr:Categoria[])=>{this.categorias = categoriaArr})
		
		//Cargar las donaciones nuevas
		this.donacionApi.find({where:{"estado":"nueva"},include:"traslado"}).subscribe((donacionesArr:Donacion[])=>{this.donacionesNuevas=donacionesArr});
		
		}

	precargar(){
		this.producto = new Producto;
		this.producto.tipoProducto = new TipoProducto;

		this.producto.tipoProducto.nombre = this.form.get("nombre").value;
		this.producto.tipoProducto.peso = this.form.get("peso").value;
		this.producto.tipoProducto.categoriaId = this.form.get("categoria").value;
		this.producto.cantidad = this.form.get("cant").value;
		this.producto.vencimiento = this.form.get("vto").value;

		this.productosPrecargados.push(this.producto)
	}


	ngOnInit() {
	}

}
