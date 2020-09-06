import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShippingFast, faDolly, faUserClock, faCubes, faKey, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { DataShareService } from 'src/app/_services/data-share.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

	 faShippingFast=faShippingFast;
	 faDolly=faDolly;
	 faUserClock=faUserClock;
	 faCubes=faCubes
	 faKey=faKey;
	 faPizzaSlice=faPizzaSlice;

	constructor(private data:DataShareService, public router:Router,public _location: Location) { }

	ngOnInit() {
		this.data.cambiarTitulo("Panel de control");
	}

}
