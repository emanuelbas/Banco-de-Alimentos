import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { faShippingFast, faDolly, faUserClock, faCubes, faKey, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook,faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { DataShareService } from 'src/app/_services/data-share.service';



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

	constructor(private data:DataShareService, public router:Router) { }

	ngOnInit() {
		this.data.cambiarTitulo("Panel de control");
	}

}
