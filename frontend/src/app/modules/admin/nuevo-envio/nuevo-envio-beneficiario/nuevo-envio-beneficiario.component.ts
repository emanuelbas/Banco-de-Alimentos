import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Producto, Volumen, EnvioParaBeneficiario, Traslado, Donacion, Beneficiario } from '../../../../_services/lbservice/models';
import { ProductoApi, DonacionApi, ItemApi, VolumenApi, EnvioParaBeneficiarioApi, TrasladoApi } from '../../../../_services/lbservice';
import { BALP } from '../../../../_models/BALP';
import { AddressConverter } from '../../../../_models/AddressConverter';
import { LbStockService } from '../../../../_services/stockservice/lb-stock.service';
import { DataShareService } from 'src/app/_services/data-share.service';
import { BeneficiarioApi } from '../../../../_services/lbservice/services';

@Component({
  selector: 'app-nuevo-envio-beneficiario',
  templateUrl: './nuevo-envio-beneficiario.component.html',
  styleUrls: ['./nuevo-envio-beneficiario.component.css']
})
export class NuevoEnvioBeneficiarioComponent implements OnInit {

  formEnvio: FormGroup;
  fechaVencimiento = new FormControl(new Date());
  minDate = new Date();
  serializedDate = new FormControl((new Date()).toISOString());
  idBeneficiario: string = '';
  idDonacion: string = 'Sin seleccionar';
  descripcion: string = '';
  volumen: Volumen = new Volumen;
  tipo: string = 'a partir de donacion'; //'a partir de donacion' o 'a partir de stock'
  fecha: Date = new Date;
  alto: string = '';
  ancho: string = '';
  largo: string = '';
  peso: number = 0;
  beneficiarioSeleccionado: '';
  converter = new AddressConverter;
  balp = new BALP;
  beneficiario: Beneficiario;
  beneficiarios;
  productosDelStock: Producto[];

  constructor(
    private data: DataShareService,
    private itemApi: ItemApi,
    private volumenApi: VolumenApi,
    private envioApi: EnvioParaBeneficiarioApi,
    private trasladoApi: TrasladoApi,
    private donacionApi: DonacionApi,
    private productoApi: ProductoApi,
    public router: Router,
    private stock: LbStockService,
    private api: BeneficiarioApi
  ) {

    this.formEnvio = new FormGroup({
      descripcion: new FormControl(),
      fechaVencimiento: new FormControl(),
      alto: new FormControl(),
      ancho: new FormControl(),
      largo: new FormControl(),
      peso: new FormControl(),
      beneficiario: new FormControl(),
      checkRetiraBeneficiario: new FormControl()

    });

    api.find().subscribe((beneficiarios) => {
      this.beneficiarios = beneficiarios;
    })

  }


  ngOnInit() {

    this.data.cambiarTitulo("Generar envío");

  }
  test() {
    this.stock.retriveProductos(this.productosDelStock).then((value) => { console.log(value) });
  }
  testeo() {
    alert('Se selecciono este beneficiario ' + this.formEnvio.get("fechaVencimiento").value);
  }

  seleccionarBeneficiario(id: string) {
    this.idBeneficiario = id;
  }
  onEnviarIdDonacion(id: string) {
    this.idDonacion = id;
  }
  onEnviarProductosDelStock(productos: Producto[]) {
    this.productosDelStock = productos;
  }
  //Recibe [volumen,peso,fecha]
  onEnviarVolumen(array: Array<any>) {
    this.volumen = array[0];
    this.peso = array[1];
    this.fecha = array[2]
  }

  calcularVolumen() {

  }

  onSubmit() {
    //Validar cada campo, si algo anda mal alert y break
    //Destinatario seleccionado

    // if (this.idBeneficiario == 'Sin seleccionar'){
    //   alert("Faltó indicar el destinatario");
    //   return;
    // }

    // //Validar tipo de envio
    // if (this.tipo == null) {
    //   alert("Hubo un problema al seleccionar el tipo de envio")
    //   return;
    // }

    //Caso a partir de donacion
    //Validar que se seleccione una donacion
    // if (this.tipo == "a partir de donacion") {
    //   if (this.idDonacion == 'Sin seleccionar') {
    //     alert("Selecciona una donación");
    //     return;
    //   }
    // }

    //Caso a partir de stock

    //Pendiente

    //Se tiene una lista de descripcion/peso

    //Validar que se tenga alto,ancho,largo,fecha y peso

    // if (this.formEnvio.get("alto").value == null || this.formEnvio.get("ancho").value == null || this.formEnvio.get("largo").value == null || this.formEnvio.get("peso").value == null) {
    //   alert("Asegurese de guardar las características del envio (Alto,Ancho,Largo,Peso,Fecha de retiro)");
    //   return;
    // }

    //Calcular distancia y puntaje
    //Falta obtener la direccion del destinatario
    // let dirDestinatario = 'Una direccion';
    // let distancia = this.converter.distanceFromTo(this.converter.coordinateForAddress(this.balp.ubicacionBALP.direccion), this.converter.coordinateForAddress(dirDestinatario));
    // let puntaje = distancia; 
    //Es un punto por cada km
    //Generar descripción a partir de la lista

    //Iniciar variables
    let nuevoEnvio: EnvioParaBeneficiario = new EnvioParaBeneficiario;
    let volumen: Volumen = new Volumen;
    volumen.alto = this.formEnvio.get("alto").value;
    volumen.ancho = this.formEnvio.get("ancho").value;
    volumen.largo = this.formEnvio.get("largo").value;
    nuevoEnvio.tipo = this.tipo;
    nuevoEnvio.beneficiarioId = this.idBeneficiario;
    // nuevoEnvio.items = this.itemList;
    nuevoEnvio.volumen = volumen; //Agregarlo aparte o buscar un nested
    let nuevoTraslado: Traslado = new Traslado;
    nuevoTraslado.fechaVencimientoProductos = this.formEnvio.get("fechaVencimiento").value;
    nuevoTraslado.fechaEstimada = this.fecha;
    nuevoTraslado.tipo = 'envio';
    nuevoTraslado.volumenTotal = volumen.alto * volumen.ancho * volumen.largo;
    nuevoTraslado.distancia = Math.round(20);
    nuevoTraslado.puntaje = Math.round(40);
    nuevoTraslado.descripcion = this.formEnvio.get("descripcion").value;


    let checkRetiraBeneficiario = this.formEnvio.get("checkRetiraBeneficiario").value;
    checkRetiraBeneficiario ? nuevoTraslado.estado = 'Donación retirada por el propio beneficiario' : nuevoTraslado.estado = 'Pendiente de retiro';
    nuevoTraslado.peso = Math.round(this.formEnvio.get("peso").value);

    console.log("Se termino de inicializar las variables a postear")
    //Postear todo
    if (this.tipo == 'a partir de donacion') {
      //Caso a partir de una donacion
      this.donacionApi.patchAttributes(this.idDonacion, { "estado": "en envio" }).subscribe((donacion) => {
        console.log("Se cambio la donacion a estado 'en envio'");
        this.envioApi.create(nuevoEnvio).subscribe((envioCreado: EnvioParaBeneficiario) => {
          console.log("Se creo la entidad envio");
          let idEnvio = envioCreado.id;
          nuevoTraslado.idEnvioTrasladadoAUnBeneficiario = idEnvio;
          console.log("Se vinculo el nuevo envio al traslado a crear");
          this.trasladoApi.create(nuevoTraslado).subscribe((trasladoCreado: Traslado) => {
            console.log("Se creo el traslado");
            let idTraslado = trasladoCreado.id;
            this.envioApi.createVolumen(idEnvio, nuevoEnvio.volumen).subscribe(() => {
              console.log("Se agregó el volumen");
              alert("Se registró el nuevo envio");
              this.router.navigate(['/panel-de-control']);

            })
          })
        })
      })


    } else {
      //Caso a partir de stock
      this.envioApi.create(nuevoEnvio).subscribe((envioCreado: EnvioParaBeneficiario) => {
        console.log("Se creo el envio");
        let idEnvio = envioCreado.id;


        this.stock.retriveProductos(this.productosDelStock).then(() => {

          nuevoTraslado.idEnvioTrasladadoAUnBeneficiario = idEnvio;
          console.log("Se vinculo el nuevo traslado con el envio creado");
          this.trasladoApi.create(nuevoTraslado).subscribe((trasladoCreado: Traslado) => {
            console.log("Se creo el traslado");
            let idTraslado = trasladoCreado.id;
            this.envioApi.createVolumen(idEnvio, nuevoEnvio.volumen).subscribe(() => {
              console.log("Se creo el volumen del envio");
              alert("Se registró la nueva donación correctamente");
              this.router.navigate(['/panel-de-control']);
            })
          })
        })
      })

    }

  }

}
