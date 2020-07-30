import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, Beneficiario } from '../../_services/lbservice/models';
import { UserApi, BeneficiarioApi  } from '../../_services/lbservice/services';
import { DataShareService } from "../../_services/data-share.service"


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  titulo = "";
  userLogged;
  tipoDeUsuario;
  constructor(public data:DataShareService, public userApi:UserApi, public router:Router, public beneficiarioApi:BeneficiarioApi) { 
    this.userLogged = userApi.getCachedCurrent();
    if (this.userLogged) {
      this.tipoDeUsuario = this.userLogged.tipoDeUsuario;
      console.log(this.tipoDeUsuario);
      if (this.tipoDeUsuario=='donante'){
        console.log(this.userLogged);
      }
    }
  }
  
  logout(){
    this.userApi.logout().subscribe(()=> {
    }); 
    this.sleep(500).then(() => {
      this.router.navigate(['/home'])
    });
  }
  verPerfil(){
    
  }


  ngOnInit() {
  }
  sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

}