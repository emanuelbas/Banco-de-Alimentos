import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Producto, Item, Volumen, EnvioParaBeneficiario, Traslado, Donacion } from '../../../../_services/lbservice/models';
import { ProductoApi, DonacionApi, ItemApi, VolumenApi, EnvioParaBeneficiarioApi, TrasladoApi } from '../../../../_services/lbservice';
import { BALP } from '../../../../_models/BALP';
import { AddressConverter } from '../../../../_models/AddressConverter';
import { LbStockService } from '../../../../_services/stockservice/lb-stock.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-nuevo-envio-principal',
  templateUrl: './nuevo-envio-principal.component.html',
  styleUrls: ['./nuevo-envio-principal.component.css']
})
export class NuevoEnvioPrincipalComponent implements OnInit {

	formEnvio : FormGroup;
	var: string = 'hola';
  idBeneficiario:string = 'Sin seleccionar';
  idDonacion:string = 'Sin seleccionar';
  itemList:Item[]=[];
  volumen:Volumen = new Volumen;
  peso:number;
  tipo:string= 'a partir de donacion'; //'a partir de donacion' o 'a partir de stock'
  fecha:Date = new Date;
  converter = new AddressConverter;
  balp = new BALP;
  productosDelStock : Producto[];
  constructor(
    private data:DataShareService, 
    private itemApi:ItemApi,
    private volumenApi:VolumenApi,
    private envioApi:EnvioParaBeneficiarioApi,
    private trasladoApi:TrasladoApi,
    private donacionApi:DonacionApi,
    private productoApi:ProductoApi,
    public router:Router,
    private stock:LbStockService
    ) {	}


  ngOnInit() {
    
		this.data.cambiarTitulo("Generar envío");

  }
  test(){
    this.stock.retriveProductos(this.productosDelStock).then((value)=>{console.log(value)});
  }
  toggleTipo(){
    if (this.tipo=='a partir de donacion'){
      this.tipo = 'a partir de stock'
    } else {
      //de stock
      this.tipo = 'a partir de donacion';
    }
  }
  onEnviarIdBeneficiario(id:string){
    this.idBeneficiario = id;
  }
  onEnviarIdDonacion(id:string){
    this.idDonacion = id;
  }
  onEnviarProductosDelStock(productos:Producto[]){
    this.productosDelStock = productos;
  }
  //Recibe [volumen,peso,fecha]
  onEnviarVolumen(array:Array<any>){
    this.volumen = array[0];
    this.peso = array[1];
    this.fecha = array[2]
  }
  onEnviarItems(items:Item[]){
    this.itemList = items;
    console.log("Se actualizo el item list del componente padre");
    console.log(this.itemList);
  }
  onEnviar(){
    //Validar cada campo, si algo anda mal alert y break

      //Destinatario seleccionado
      if( this.idBeneficiario == 'Sin seleccionar'){
        alert("Faltó indicar el destinatario");
        return;
      }

      //Validar tipo de envio
      if (this.tipo == null){
        alert("Hubo un problema al seleccionar el tipo de envio")
        return;
      }

      //Caso a partir de donacion

        //Validar que se seleccione una donacio
        if (this.tipo == "a partir de donacion"){
          if (this.idDonacion == 'Sin seleccionar'){
            alert("Selecciona una donación");
            return;
          }
        }

      //Caso a partir de stock

        //Pendiente

      //Se tiene una lista de descripcion/peso

      //Validar que se tenga alto,ancho,largo,fecha y peso
      if (this.volumen.alto == null || this.volumen.ancho == null || this.volumen.largo == null || this.peso == null){
        alert("Asegurese de guardar las características del envio (Alto,Ancho,Largo,Peso,Fecha de retiro)");
        return;
      }

    //Calcular distancia y puntaje
    //Falta obtener la direccion del destinatario
    let dirDestinatario = 'Una direccion';
    let distancia = this.converter.distanceFromTo(this.converter.coordinateForAddress(this.balp.ubicacionBALP.direccion),this.converter.coordinateForAddress(dirDestinatario));
    let puntaje = distancia; //Es un punto por cada km
    //Generar descripción a partir de la lista
    let desc = '';
    for (let item of this.itemList ){
      desc = desc + item.descripcion + '; '; 
    }

    //Iniciar variables
    let nuevoEnvio : EnvioParaBeneficiario = new EnvioParaBeneficiario;
    nuevoEnvio.tipo = this.tipo;
    nuevoEnvio.beneficiarioId = this.idBeneficiario;
    nuevoEnvio.items = this.itemList;
    nuevoEnvio.volumen = this.volumen; //Agregarlo aparte o buscar un nested
    let nuevoTraslado: Traslado = new Traslado;
    nuevoTraslado.fechaEstimada = this.fecha;
    nuevoTraslado.estado = 'pendiente de retiro';
    nuevoTraslado.tipo = 'envio';
    nuevoTraslado.volumenTotal = this.volumen.alto * this.volumen.ancho * this.volumen.largo;
    nuevoTraslado.distancia = Math.round(distancia);
    nuevoTraslado.puntaje = Math.round(puntaje);
    nuevoTraslado.descripcion = desc;
    nuevoTraslado.peso = Math.round(this.peso);

    console.log("Se termino de inicializar las variables a postear")
    //Postear todo
    if (this.tipo == 'a partir de donacion'){
      //Caso a partir de una donacion
      this.donacionApi.patchAttributes(this.idDonacion,{"estado":"en envio"}).subscribe((donacion)=>{
        console.log("Se cambio la donacion a estado 'en envio'");
        this.envioApi.create(nuevoEnvio).subscribe((envioCreado:EnvioParaBeneficiario)=>{
          console.log("Se creo la entidad envio");
          let idEnvio = envioCreado.id;
          nuevoTraslado.idEnvioTrasladadoAUnBeneficiario = idEnvio;
          console.log("Se vinculo el nuevo envio al traslado a crear");
          this.trasladoApi.create(nuevoTraslado).subscribe((trasladoCreado:Traslado)=>{
            console.log("Se creo el traslado");
            let idTraslado = trasladoCreado.id;
            this.envioApi.createVolumen(idEnvio,nuevoEnvio.volumen).subscribe(()=>{
              console.log("Se agregó el volumen");
              for (let item of this.itemList){
                item.envioParaBeneficiarioId=idEnvio;
              }
              this.itemApi.createMany(this.itemList).subscribe(()=>{
                alert("Se registró el nuevo envio");
                this.router.navigate(['/panel-de-control']);
              });
            })
          })
        })
      })


    } else {
      //Caso a partir de stock
      this.envioApi.create(nuevoEnvio).subscribe((envioCreado:EnvioParaBeneficiario)=>{
        console.log("Se creo el envio");
        let idEnvio = envioCreado.id;


        this.stock.retriveProductos(this.productosDelStock).then(()=>{
          
          nuevoTraslado.idEnvioTrasladadoAUnBeneficiario = idEnvio;
          console.log("Se vinculo el nuevo traslado con el envio creado");
          this.trasladoApi.create(nuevoTraslado).subscribe((trasladoCreado:Traslado)=>{
            console.log("Se creo el traslado");
            let idTraslado = trasladoCreado.id;
            this.envioApi.createVolumen(idEnvio,nuevoEnvio.volumen).subscribe(()=>{
              console.log("Se creo el volumen del envio");
              this.envioApi.createManyItems(idEnvio,this.itemList).subscribe(()=>{
                console.log("Se crearon los items del envio");
                alert("Se registró la nueva donación correctamente");
                this.router.navigate(['/panel-de-control']);
              })
            })
          })
        })
      })

    }

  }

}
