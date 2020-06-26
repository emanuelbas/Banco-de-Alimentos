import { Injectable } from '@angular/core';
import { Producto, TipoProducto, Categoria } from '../lbservice';
import { AbstractStockService } from '../stockservice/abstract-stock.service';

@Injectable({
  providedIn: 'root'
})
export class MockStockService extends AbstractStockService {

	productos: Producto[] = [];
  constructor() {
  	super();

  	//Productos mockeados
  	let p1 = new Producto;
  	let p2 = new Producto;
  	let p3 = new Producto;
  	let p4 = new Producto;
  	let p5 = new Producto;
  	p1.cantidad = 5;
  	p2.cantidad = 24;
  	p3.cantidad = 54;
  	p4.cantidad = 34;
  	p5.cantidad = 553;
  	p1.vencimiento = new Date;
  	p2.vencimiento = new Date;
  	p3.vencimiento = new Date;
  	p4.vencimiento = new Date;
  	p5.vencimiento = new Date;
  	p1.tipoProducto = new TipoProducto;
	p2.tipoProducto = new TipoProducto;
	p3.tipoProducto = new TipoProducto;
	p4.tipoProducto = new TipoProducto;
	p5.tipoProducto = new TipoProducto;
	p1.tipoProducto.nombre = 'CARAMELO SURTIDO MANDARINA Y FRUTILLA';
	p2.tipoProducto.nombre = 'MENTHOPLUS ZERO POMELO ROSADO';
	p3.tipoProducto.nombre = 'SEVEN ULTRA RED BERRY';
	p4.tipoProducto.nombre = 'SEVEN ULTRA RED BERRY';
	p5.tipoProducto.nombre = 'MENTHOPLUS ZERO POMELO ROSADO';
  
  p1.tipoProducto.peso = 0.50;
  p2.tipoProducto.peso = 0.350;
  p3.tipoProducto.peso = 1;
  p4.tipoProducto.peso = 0.50;
  p5.tipoProducto.peso = 0.50;

  let categoriaGolosinas = new Categoria;
  categoriaGolosinas.nombre = "Golosinas";

  p1.tipoProducto.categoria = categoriaGolosinas;
  p2.tipoProducto.categoria = categoriaGolosinas;
  p3.tipoProducto.categoria = categoriaGolosinas;
  p4.tipoProducto.categoria = categoriaGolosinas;
  p5.tipoProducto.categoria = categoriaGolosinas;

  p1.tipoProducto.categoria.nombre = "Golosinas";
  p2.tipoProducto.categoria.nombre = "Golosinas";
  p3.tipoProducto.categoria.nombre = "Golosinas";
  p4.tipoProducto.categoria.nombre = "Golosinas";
  p5.tipoProducto.categoria.nombre = "Golosinas";

  p1.tipoProductoId = "5dd8caa712011b173cced718";
  p2.tipoProductoId = "5dd8caa712011b173cced719";
  p3.tipoProductoId = "5dd8caa712011b173cced71a";
  p4.tipoProductoId = "5dd8caa712011b173cced71a";
  p5.tipoProductoId = "5dd8caa712011b173cced719";
	
  	this.productos = [p1,p2,p3,p4,p5];
    console.log("Se inicializo el servicio: ");
    console.log(this.productos);

   }

   //Devuelve una lista de productos con nombre, vencimiento y cantidad
   getProductos(): Promise<Producto[]>{
    let promesa = Promise.resolve(this.productos);
    return promesa;
   }

   /* Recibe una lista de productos con nombre, vencimiento y cantidad
    * Comprueba que existan
    * Los decrementa o los borra si no quedan mas
    * Es importante que los productos recibidos incluyan su tipo
    */
   retriveProductos(productos:Producto[]): Promise<boolean>{
   	for (let producto of productos){
   		//Checkear si hay suficientes, sino devolver false
       console.log(producto);
       console.log(this.productos);
       console.log(new Date == producto.vencimiento);
   		let interno:Producto = this.productos.find(elemento => (elemento.tipoProductoId == producto.tipoProductoId));
       if (interno.cantidad < producto.cantidad){
   			//No hay suficientes
   			return Promise.resolve(false);
   		}
   	}
   	//Comprobé que hay suficiente stock de todos los productos, ahora a descontarlos
   	for (let producto of productos){
   		//Descrementar
   		let interno = this.productos.find(elemento => (elemento.tipoProductoId == producto.tipoProductoId));
   		interno.cantidad = interno.cantidad - producto.cantidad;	
   	}
   	return Promise.resolve(true);
   }
}
