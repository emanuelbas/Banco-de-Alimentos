import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto, ProductoApi } from '../../../../_services/lbservice';
import { DataShareService } from 'src/app/_services/data-share.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
//Reemplazar por el servicio real
import { MockStockService } from '../../../../_services/stockservice/mock-stock.service';

@Component({
  selector: 'app-stock-ventana-principal',
  templateUrl: './stock-ventana-principal.component.html',
  styleUrls: ['./stock-ventana-principal.component.css']
})
export class StockVentanaPrincipalComponent implements OnInit {

  productosEnStock : Producto[] = [];
  productoAEditar:Producto;
  productoAEliminar:Number;
  form: FormGroup;
  constructor(
    private data:DataShareService,
  	private router:Router,
    private productoApi:ProductoApi,
    public _location: Location
  ) {
    this.productoApi.find({include:{tipoProducto:'categoria'}}).subscribe((productos:Producto[])=>{this.productosEnStock=productos;console.log(this.productosEnStock)});
    //this.productoApi.find({include:"tipoProducto"}).subscribe((productos:Producto[])=>{this.productosEnStock=productos});
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      cant: new FormControl('', [Validators.required]),
      vto: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
        });
  }
  	//Me gustaría recuperar todas las donaciones en estado nueva
  	//(vigilar que las donaciones no cambien de estado cuando se las traslada hacia el banco)

  irAAgregarDonacion(){
  	this.router.navigateByUrl("/cargar-donacion-a-stock");

  }
  irAAgregarProducto(){
  	this.router.navigateByUrl("/cargar-producto-a-stock");	
  }

  borrarProducto(){
    this.productoApi.deleteById(this.productoAEliminar).subscribe(()=>{
      this.productosEnStock = this.productosEnStock.filter((prod)=>{return prod.id != this.productoAEliminar});
    });
  }

confirmBorrarProducto(id){
  this.productoAEliminar = id;
}

  editarProducto(producto:Producto){
    this.productoAEditar = producto;
    this.form.setValue({nombre:this.productoAEditar.tipoProducto.nombre,categoria:"categoria",cant:this.productoAEditar.cantidad,vto:new Date,peso:0});
  }

  ngOnInit() {
    this.data.cambiarTitulo("Stock");
  }
  get nombre(){return this.form.get('nombre');};
  get categoria(){return this.form.get('categoria')};
  get cant(){return this.form.get('cant')};
  get vto(){return this.form.get('vto')};
  get peso(){return this.form.get('peso')};

  submitProduct(){
    this.productoAEditar.tipoProducto.nombre = this.form.get("nombre").value;
    this.productoAEditar.cantidad = this.form.get("cant").value;
    this.productoApi.patchAttributes(this.productoAEditar.id,this.productoAEditar).subscribe(()=>{
      delete this.productoAEditar;
    })
  }
}
