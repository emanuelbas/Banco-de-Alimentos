import { Component, OnInit } from '@angular/core';
import { TrasladoApi, DonanteApi, DonacionApi, DescripcionGeneralApi, ContainerApi} from '../../../_services/lbservice/services';
import { Donante, Donacion, DescripcionGeneral, Traslado } from '../../../_services/lbservice/models';  
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BALP } from '../../../_models/BALP';
import { AddressConverter } from '../../../_models/AddressConverter'
import { Validators } from '@angular/forms';
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-registrar-donacion-general',
  templateUrl: './registrar-donacion-general.component.html',
  styleUrls: ['./registrar-donacion-general.component.css']
})
export class RegistrarDonacionGeneralComponent implements OnInit {

	formGeneral: FormGroup;
  distancia;
  fechaActual = new Date();
  afuConfig: any;
  filename: string;

      @ViewChild('fileUpload1',null)
      private fileUpload1:  AngularFileUploaderComponent;




  constructor(private containerApi:ContainerApi,private router:Router,private trasladoApi:TrasladoApi,private donanteApi: DonanteApi, private donacionApi:DonacionApi, private descApi:DescripcionGeneralApi) {
    

  	 this.formGeneral = new FormGroup({
        fechaVto: new FormControl('', [Validators.required]),
        alto: new FormControl('', [Validators.required]),
        ancho: new FormControl('', [Validators.required]),
        largo: new FormControl('', [Validators.required]),
        texto: new FormControl('', [Validators.required]),
        peso: new FormControl('', [Validators.required])
        //, archivo: new FormControl('', [])
        

      });


      //Obteniendo distancia
      let idDonante = donanteApi.getCachedCurrent().id;
      let converter = new AddressConverter;
      let balp = new BALP;
      this.donanteApi.getUbicacion(idDonante,true).subscribe((ubi)=>{
        let origen = converter.coordinateForAddress(ubi.direccion);
        let destino = converter.coordinateForAddress(balp.ubicacionBALP.direccion);
        this.distancia = converter.distanceFromTo(origen,destino);
      })

      //File uploader
      this.afuConfig = {
          uploadAPI: {
            url:"http://localhost:3000/api/containers/container/upload",
          },
          formatsAllowed: ".pdf,.png,.txt,.doc,.docx,.odt,.rtf,.csv,.xls,.xlsx,.xlsm",
          theme: "dragNDrop",
          hideResetBtn: true,
          replaceTexts: {
            selectFileBtn: 'Seleccionar archivo',
            resetBtn: 'Reset',
            uploadBtn: 'Subir',
            dragNDropBox: 'Arrastre su archivo aquí',
            attachPinBtn: 'Archivos adjuntos: ',
            afterUploadMsg_success: 'Se subió el archivo!',
            afterUploadMsg_error: 'Falló',
            sizeLimit: 'Tamaño máximo: '
          },
          fileNameIndex: true
          //hideProgressBar: true,
      };

  }

  get fechaVto() { return this.formGeneral.get('fechaVto'); }
  get alto() { return this.formGeneral.get('alto'); }
  get ancho() { return this.formGeneral.get('ancho'); }
  get largo() { return this.formGeneral.get('largo'); }
  get texto() { return this.formGeneral.get('texto'); }
  get peso() { return this.formGeneral.get('peso'); }



  onSubmit(){
    if (this.formGeneral.valid) {
      let texto = this.formGeneral.get("texto").value;
      let fechaRetiro = this.formGeneral.get("fechaVto").value;
      let fechaVto = this.formGeneral.get("fechaVto").value;
      let alto = this.formGeneral.get("alto").value;
      let ancho = this.formGeneral.get("ancho").value;
      let largo = this.formGeneral.get("largo").value;
      let peso = this.formGeneral.get("peso").value;

      let desc: DescripcionGeneral = new DescripcionGeneral;
      let donante: Donante = new Donante;
      let donacion: Donacion = new Donacion;
      let traslado: Traslado = new Traslado;
      let idDonante = this.donanteApi.getCachedCurrent().id;


      donacion.idDonante = idDonante;
      donacion.estado = 'nueva';
      donacion.tipoDescripcion = 'general';
      // Se consulta si la donación es llevada por propio donante o si queda sin asignar
      var element = <HTMLInputElement> document.getElementById("enviaDonante");
      var isChecked = element.checked;
      if (isChecked) {
            //alert("se selecciono chequed");
            //traslado.estado = 'Donación transportada por el donante';

            donacion.estado = 'Donación transportada por el propio donante';
      }
      this.donacionApi.count().subscribe((numero)=>{
          donacion.numero = numero.count;
          donacion.filename = this.filename;
          this.donacionApi.create(donacion).subscribe((donacionCreada:Donacion)=>{
            traslado.idDonacionTrasladadaAlBanco = donacionCreada.id;
            traslado.tipo = 'donacion';
            traslado.volumenTotal = alto * ancho * largo;
            traslado.descripcion = texto;
            traslado.puntaje = this.distancia * peso;
            traslado.distancia = this.distancia;
            traslado.peso= peso;
            traslado.fechaVencimientoProductos = fechaVto;
            traslado.fechaEstimada= fechaVto; //Hay que borrarla en algun momento




            this.trasladoApi.create(traslado).subscribe(()=>{
              
              //De legado
              desc.descripcion=texto;

              desc.idDonacion=donacionCreada.id;
              //desc.volumenes FALTA pero es obsoleto por ahora
              this.descApi.create(desc).subscribe((desc:DescripcionGeneral)=>{
                

                /*
                this.containerApi.upload('store',file).subscribe(()=>{
                  this.router.navigateByUrl("/mis-donaciones");
                  alert('Se registró la donación');
                });
                */

                this.router.navigateByUrl("/mis-donaciones");
                alert('Se registró la donación');




              })//Fin create desc
            })//Fin create traslado
          })//Fin create donacion          
        }) //Fin count
      } else {
        alert('Por favor, completa los datos solicitados');
      }
  }


  DocUpload(res){
    this.filename = res.body.result.files.file0[0].name;
    console.log(res.body.result.files.file0[0].name)
  }

  ngOnInit() {
  }

}
