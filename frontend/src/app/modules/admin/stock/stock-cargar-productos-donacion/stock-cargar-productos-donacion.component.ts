import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Donacion, DonacionApi, Producto, ProductoApi, TipoProducto, TipoProductoApi, Categoria, CategoriaApi } from '../../../../_services/lbservice';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-stock-cargar-productos-donacion',
  templateUrl: './stock-cargar-productos-donacion.component.html',
  styleUrls: ['./stock-cargar-productos-donacion.component.css']
})
export class StockCargarProductosDonacionComponent implements OnInit {

	form: FormGroup;
	formDonacion: FormGroup;
	fechaActual = new Date();
	producto: Producto;
	categorias: Categoria[];
	public seleccionado:any;
	base = environment.backendUrl;

	//Donaciones que no esten desarmadas ni enviadas en una donacion
	donacionesNuevas : Donacion[];
	productosPrecargados:Producto[] = [];

	constructor(
		private router:Router,
		private productoApi:ProductoApi,
		private tipoApi:TipoProductoApi,
		private categoriaApi:CategoriaApi,
		private donacionApi:DonacionApi
		//apiDonacion
		) {

		this.formDonacion = new FormGroup({
			donacion: new FormControl('',[Validators.required])
		});

		this.form = new FormGroup({
			nombre: new FormControl('', [Validators.required]),
			categoria: new FormControl('', [Validators.required]),
			cant: new FormControl('', [Validators.required]),
			vto: new FormControl('', [Validators.required]),
			peso: new FormControl('', [Validators.required]),
      	});

		this.categoriaApi.find().subscribe((categoriaArr:Categoria[])=>{this.categorias = categoriaArr})
		
		//Cargar las donaciones nuevas
		this.donacionApi.find({where:{or:[{"estado":"nueva"},{"estado":"Donación transportada por el propio donante"}]},include:"traslado"}).subscribe((donacionesArr:Donacion[])=>{this.donacionesNuevas=donacionesArr});
		
		}

	submitProduct(){
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

	get nombre(){return this.form.get('nombre');};
	get categoria(){return this.form.get('categoria')};
	get cant(){return this.form.get('cant')};
	get vto(){return this.form.get('vto')};
	get peso(){return this.form.get('peso')};
	get donacion(){return this.formDonacion.get('donacion')};

	submitAll(donacion:Donacion){

		//Hago un array para registrar los tipoProducto
		let tipoProductos:TipoProducto[] = []; 
		for (let i=0; i< this.productosPrecargados.length;i++){
			tipoProductos[i] = this.productosPrecargados[i].tipoProducto;
		}

		//Registro los tipoProducto y obtengo su ID, entonces registro los productos
		this.tipoApi.createMany(tipoProductos).subscribe((res:TipoProducto[])=>{
			for (let i=0; i<this.productosPrecargados.length;i++){
				this.productosPrecargados[i].tipoProductoId = res[i].id;
			};
			this.productoApi.createMany(this.productosPrecargados).subscribe(()=>{
				alert("Se crearon todos los productos y sus tipo productos");
				donacion.estado = "desarmada";
				this.donacionApi.patchAttributes(donacion.id,donacion).subscribe(()=>{alert("Se agregaron los productos y se borró la donacón");this.router.navigateByUrl('ver-stock')})
			});
		});
	};

	getNombreDeCategoria(unId){
		return this.categorias.find(categoria=>categoria.id==unId).nombre;
	}

}
