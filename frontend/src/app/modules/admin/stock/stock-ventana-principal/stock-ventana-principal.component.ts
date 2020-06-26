import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-ventana-principal',
  templateUrl: './stock-ventana-principal.component.html',
  styleUrls: ['./stock-ventana-principal.component.css']
})
export class StockVentanaPrincipalComponent implements OnInit {

  constructor(
  	private router:Router
  ) { }

  irAAgregarDonacion(){
  	this.router.navigateByUrl("/cargar-donacion-a-stock");

  }
  irAAgregarProducto(){
  	this.router.navigateByUrl("/cargar-producto-a-stock");	
  }

  ngOnInit() {
  }

}
