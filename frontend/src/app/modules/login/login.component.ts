import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User, Beneficiario, Donante, Voluntario } from '../../_services/lbservice/models';  
import { UserApi, BeneficiarioApi, DonanteApi, VoluntarioApi } from '../../_services/lbservice/services';
import { AccessToken }  from '../../_services/lbservice/models'; 
import { Validators } from '@angular/forms';
import { HttpService } from '../../_services/http.service';
import { DataShareService } from 'src/app/_services/data-share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;
  user: User;
  beneficiario:Beneficiario;
  voluntario:Voluntario;
  donante:Donante;
  constructor(private data:DataShareService, private http: HttpService, private userApi: UserApi,private donanteApi: DonanteApi,private beneficiarioApi: BeneficiarioApi,private voluntarioApi: VoluntarioApi, private route: ActivatedRoute , private router:Router) { 
	this.logInForm = new FormGroup({
		tipoUsuario: new FormControl(),
	   usuario: new FormControl('',[Validators.required]),
	   clave: new FormControl('',[Validators.required])
    });
  }

  get usuario() {return this.logInForm.get('usuario');}
  get clave() {return this.logInForm.get('clave');}

  
  onSubmit(){

    if (this.logInForm.valid) {    
	 switch (this.logInForm.get("tipoUsuario").value) {
		 case 'a':
			this.user = new User();
			this.user.username = this.logInForm.get("usuario").value;
			this.user.password = this.logInForm.get("clave").value;
			this.userApi.login(this.user).subscribe((token: AccessToken)=> {this.router.navigate(['/panel-de-control'])},(error)=>{alert("Tu nombre de usuario o contraseña es incorrecto, vuelve a intentarlo")});
			break;
		case 'b':
			this.beneficiario = new Beneficiario();
			this.beneficiario.username = this.logInForm.get("usuario").value;
			this.beneficiario.password = this.logInForm.get("clave").value;
			this.beneficiarioApi.login(this.beneficiario).subscribe((token: AccessToken)=> {this.router.navigate(['/perfil-beneficiario'])},(error)=>{alert("Tu nombre de usuario o contraseña es incorrecto, vuelve a intentarlo")});
			break;
		case 'd':
			this.donante = new Donante();
			this.donante.username = this.logInForm.get("usuario").value;
			this.donante.password = this.logInForm.get("clave").value;
			this.donanteApi.login(this.donante).subscribe((token: AccessToken)=> {this.router.navigate(['/perfil-donante'])},(error)=>{alert("Tu nombre de usuario o contraseña es incorrecto, vuelve a intentarlo")});
			break;
		case 'v':
			this.voluntario = new Voluntario();
			this.voluntario.username = this.logInForm.get("usuario").value;
			this.voluntario.password = this.logInForm.get("clave").value;
			this.voluntarioApi.login(this.voluntario).subscribe((token: AccessToken)=> {this.router.navigate(['/perfil-voluntario'])},(error)=>{alert("Tu nombre de usuario o contraseña es incorrecto, vuelve a intentarlo")});
			break;
	 }
	} else {
		alert('Por favor, completa los datos solicitados'); 	  
	}
}

	testingEnviarEmail(){
	let user = {
      name: 'Juancito',
      email: 'balpiaw2019@gmail.com',
      html: '<h1> ¡Tenés un traslado disponible! </h1><p>Ingresa al siguiente enlace para ver detalles: </p>'+'http://localhost:4200/asignar-traslado/'+'2342342342344',
      subject: 'Traslado disponible'
    }
    alert('email enviado a '+ user.name)
	this.http.sendEmail("http://localhost:3000/sendmail",user ).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );
}

  ngOnInit() {
    this.data.cambiarTitulo("");
  }

}
