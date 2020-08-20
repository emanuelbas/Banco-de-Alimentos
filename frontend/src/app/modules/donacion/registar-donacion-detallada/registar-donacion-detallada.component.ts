import { Component, OnInit } from '@angular/core';
import { TrasladoApi, DonanteApi, DonacionApi, DescripcionDetalladaApi, ProductoApi, TipoProductoApi } from '../../../_services/lbservice/services';
import { Donacion, DescripcionDetallada, Producto, TipoProducto, Traslado } from '../../../_services/lbservice/models';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BALP } from '../../../_models/BALP';
import { AddressConverter } from '../../../_models/AddressConverter';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registar-donacion-detallada',
  templateUrl: './registar-donacion-detallada.component.html',
  styleUrls: ['./registar-donacion-detallada.component.css']
})
export class RegistarDonacionDetalladaComponent implements OnInit {

  //Tipo produco usado para observar si el codigo indicado pega con alguno de estos
  productosValidos = [];

  //La clase Producto tiene cantidad y vencimiento y conoce su tipo. usada
  //para enlistar los productos
  productos = [];

  //fechaRetirro, barcode, ammount
  formDetallada: FormGroup;

  //conoce su descripcion y se debe crear un traslado con su fecha de retiro
  nuevaDonacion: Donacion;
  numeroDonacion: number;

  //contiene la lista de productos
  descripcion: DescripcionDetallada;
  //un texto descriptivo que va a contener los nombres de todos los productos
  textoDescriptivo: string;

  //se lo debe iniciar vinculado a la nueva donacion y con
  //fecha estimada = fecha de retiro del form
  traslado: Traslado;

  public p: any;
  idDonante;
  distancia;
  balp = new BALP;
  fechaActual = new Date();
  //Inicializar el form y algunas variables
  constructor(private router: Router, private apiTraslado: TrasladoApi, private apiDonante: DonanteApi, private apiDonacion: DonacionApi, private apiDescripcion: DescripcionDetalladaApi, private apiProducto: ProductoApi, private apiTipoProducto: TipoProductoApi) {
    this.formDetallada = new FormGroup({
      fechaRetiro: new FormControl('', [Validators.required]),
      barcode: new FormControl('', [Validators.required]),
      ammount: new FormControl('', [Validators.required]),
      vto: new FormControl('', [Validators.required]),
      alto: new FormControl('', [Validators.required]),
      ancho: new FormControl('', [Validators.required]),
      largo: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required])

    });
    this.idDonante = apiDonante.getCachedCurrent().id;
    this.nuevaDonacion = new Donacion;
    this.descripcion = new DescripcionDetallada;
    this.traslado = new Traslado;

    //Obteniendo distancia
    let converter = new AddressConverter;
    this.apiDonante.getUbicacion(this.idDonante, true).subscribe((ubi) => {
      let origen = converter.coordinateForAddress(ubi.direccion);
      let destino = converter.coordinateForAddress(this.balp.ubicacionBALP.direccion);
      this.distancia = converter.distanceFromTo(origen, destino);
    })



    //Le pido todos los tipo producto a la api (0:nombre,1:codigo,2:id)
    apiTipoProducto.find().subscribe((todoslosproductos) => {
      this.productosValidos = todoslosproductos;
      console.log("<<< A continuación se muestran los productos registrados y sus codigos >>>")
      for (let i = 0;i<this.productosValidos.length;i++){
                console.log(this.productosValidos[i].nombre + ' codigo: '+this.productosValidos[i].codigoBarra )
      } //testing
    });

    //Obtengo el numero de donacion
    this.apiDonacion.count().subscribe((numero) => {
      this.numeroDonacion = numero.count;
    })
  }

  get fechaRetiro() { return this.formDetallada.get('fechaRetiro'); }
  get barcode() { return this.formDetallada.get('barcode'); }
  get ammount() { return this.formDetallada.get('ammount'); }
  get vto() { return this.formDetallada.get('vto'); }
  get alto() { return this.formDetallada.get('alto'); }
  get ancho() { return this.formDetallada.get('ancho'); }
  get largo() { return this.formDetallada.get('largo'); }
  get peso() { return this.formDetallada.get('peso'); }


  //Se llama cuando se presiona agregar producto
  //Si el producto es válido lo agrega a la lista de productos
  //Se agrega: Descripcion del producto, cantidad, idTipoProducto, vencimiento
  agregarProducto() {

    // VALIDACIONES
    let barcode = this.formDetallada.get("barcode").value;
    let existeElCodigo = this.productosValidos.some((element: TipoProducto) => element.codigoBarra == barcode);
    let cantidad = this.formDetallada.get("ammount").value;
    let vto = this.formDetallada.get("vto").value;
    if (!existeElCodigo) {
      alert("El código no existe");
      return 0;
    }
    if (cantidad <= 0) {
      alert(cantidad);
      return 0;
    }
    //Controlar que noeste vencido

    // CARGAR
    // Quiero cargar Descripcion (esta en tipoProducto), vto, cantidad, idTipoProducto
    let tipo: TipoProducto = this.productosValidos.find(tipoproducto => tipoproducto.codigoBarra == barcode);
    console.log(tipo);
    this.productos.push([
      tipo.nombre,
      cantidad,
      vto,
      tipo.id
    ])

    //Los productos se agregan y se muestran, ahora hay que mandar todo a la API
    //en onSubmit
  }

  //Debe enviar a la api el traslado, donacion, descripcion, productos
  onSubmit() {

    if (this.formDetallada.valid) {

      //genero el texto descriptivo
      this.textoDescriptivo = 'Descripción:';
      for (let producto of this.productos) {
        this.textoDescriptivo = this.textoDescriptivo + '\n* ' + producto[0] + ' x' + producto[1];
      };
      console.log(this.textoDescriptivo);

      this.nuevaDonacion.idDonante = this.idDonante;
      this.nuevaDonacion.estado = 'nueva';
      this.nuevaDonacion.numero = this.numeroDonacion;
      this.nuevaDonacion.tipoDescripcion = 'detallada';
      this.apiDonacion.create(this.nuevaDonacion).subscribe((donacionCreada: Donacion) => {
        //Ahora creo su traslado
        console.log('Se creo la donacion vacia');
        this.traslado.fechaEstimada = this.formDetallada.get("fechaRetiro").value;
        this.traslado.idDonacionTrasladadaAlBanco = donacionCreada.id;
        this.traslado.tipo = 'donacion';
        this.traslado.peso = this.formDetallada.get("peso").value;

        //testear que se guarde el volumenTotal correcto
        this.traslado.volumenTotal = this.formDetallada.get("alto").value + this.formDetallada.get("ancho").value + this.formDetallada.get("largo").value;

        this.traslado.distancia = this.distancia;
        this.traslado.descripcion = this.textoDescriptivo;
        this.traslado.puntaje = Math.round(this.traslado.peso * this.distancia);

        this.apiTraslado.create(this.traslado).subscribe(() => {
          console.log('Se creo el traslado');
          this.descripcion.idDonacion = donacionCreada.id;

          //De legado
          this.descripcion.descripcion = this.textoDescriptivo;

          this.apiDescripcion.create(this.descripcion).subscribe((desc: DescripcionDetallada) => {
            console.log('Se creo la desc');
            let nuevosProductos = [];
            console.log(this.productos);
            for (let producto of this.productos) {
              console.log(producto)
              /* Esto tiene this.productos
                0 tipo.nombre,
                1 cantidad,
                2 vto,
                3 tipo.id
              */
              let nuevoProducto = new Producto;
              nuevoProducto.cantidad = producto[1];
              nuevoProducto.vencimiento = producto[2];
              nuevoProducto.tipoProductoId = producto[3];
              nuevoProducto.descripcionDetalladaId = desc.id;
              console.log(nuevoProducto.cantidad);
              nuevosProductos.push(nuevoProducto);
            } //Fin for productos
            this.apiDescripcion.createProductos(desc.id, nuevosProductos).subscribe(() => {
              //Aca tendria que agregarle el volumen a la donacion
              this.router.navigateByUrl("/mis-donaciones");
              alert('Se registró la donación');
            }) //Fin productos
          }) //Fin descripcion
        }) //Fin traslado
      }) //Fin donacion
    } else {
      alert('Por favor, completa los datos solicitados');
    } //Fin submit
  }
  //En el futuro se mostrará un lector de código de barras y al captar
  //rellenará el campo de código por lo que estaría bueno mockear ese fill
  leerConScanner() {
    alert('Se simula la lectura de un menthoplus');
    this.formDetallada.get("barcode").setValue('77946836');
  }

  ngOnInit() {
  }

}
