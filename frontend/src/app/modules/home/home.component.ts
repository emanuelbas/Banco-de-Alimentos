import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from '../../_services/lbservice';
import { DataShareService } from 'src/app/_services/data-share.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

userLogged;
  constructor(private data:DataShareService, public api:UserApi,public router:Router) {
  		this.userLogged = api.isAuthenticated();
   }

  ngOnInit() {
		this.data.cambiarTitulo("");
  }

}
