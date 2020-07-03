import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto, ProductoApi } from '../../../../_services/lbservice';
import { DataShareService } from 'src/app/_services/data-share.service';

//Reemplazar por el servicio real
import { MockStockService } from '../../../../_services/stockservice/mock-stock.service';

@Component({
  selector: 'app-stock-ventana-principal',
  templateUrl: './stock-ventana-principal.component.html',
  styleUrls: ['./stock-ventana-principal.component.css']
})
export class StockVentanaPrincipalComponent implements OnInit {

  productosEnStock : Producto[] = [];
  constructor(
    private data:DataShareService,
  	private router:Router,
    private productoApi:ProductoApi
  ) {
    this.productoApi.find({include:{tipoProducto:'categoria'}}).subscribe((productos:Producto[])=>{this.productosEnStock=productos;console.log(this.productosEnStock)});
    //this.productoApi.find({include:"tipoProducto"}).subscribe((productos:Producto[])=>{this.productosEnStock=productos});
  }
  	//Me gustaría recuperar todas las donaciones en estado nueva
  	//(vigilar que las donaciones no cambien de estado cuando se las traslada hacia el banco)

  irAAgregarDonacion(){
  	this.router.navigateByUrl("/cargar-donacion-a-stock");

  }
  irAAgregarProducto(){
  	this.router.navigateByUrl("/cargar-producto-a-stock");	
  }

  ngOnInit() {
    this.data.cambiarTitulo("Stock");
  }

}
