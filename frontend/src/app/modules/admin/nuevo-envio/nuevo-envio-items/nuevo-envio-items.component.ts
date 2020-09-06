import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from '../../../../_services/lbservice/models';

@Component({
  selector: 'app-nuevo-envio-items',
  templateUrl: './nuevo-envio-items.component.html',
  styleUrls: ['./nuevo-envio-items.component.css']
})
export class NuevoEnvioItemsComponent implements OnInit {

	form:FormGroup;
	lista: Item[] = [];

	@Output() enviarItems = new EventEmitter<Item[]>();
	constructor() {
		this.form = new FormGroup({
			descripcion: new FormControl(),
			peso: new FormControl()
	   	});

	}

	enviarAlPadre(){
    	this.enviarItems.emit(this.lista);
    }

    agregar(){
    	let item = new Item;
    	item.descripcion= this.form.get("descripcion").value;
    	item.peso= this.form.get("peso").value;
    	this.lista.push(item);
      this.form.reset();
    	this.enviarAlPadre();
    }

    borrar(item:Item){
    	let index = this.lista.indexOf(item);
    	this.lista.splice(index,1);
    	this.enviarAlPadre();
    }

  ngOnInit() {
  }

}
