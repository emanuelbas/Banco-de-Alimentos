import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RegistrarDonanteComponent } from './modules/donante/registrar-donante/registrar-donante.component';
import { RegistrarBeneficiarioComponent } from './modules/beneficiario/registrar-beneficiario/registrar-beneficiario.component';
import { RegistrarVoluntarioComponent } from './modules/voluntario/registrar-voluntario/registrar-voluntario.component';
import { LoginComponent } from './modules/login/login.component';
import { PerfilVoluntarioComponent } from './modules/voluntario/perfil-voluntario/perfil-voluntario.component';
import { VerBeneficiariosComponent } from './modules/beneficiario/ver-beneficiarios/ver-beneficiarios.component';
import { BuscarVoluntarioComponent } from './modules/admin/buscar-voluntario/buscar-voluntario.component';
import { CambiarClaveComponent } from './modules/cuenta/cambiar-clave/cambiar-clave.component';
import { VerTopComponent } from './modules/topDonaciones/ver-top/ver-top.component';
import { PerfilDonanteComponent } from './modules/donante/perfil-donante/perfil-donante.component';
import { MisDonacionesComponent } from './modules/donante/mis-donaciones/mis-donaciones.component';
import { RegistarDonacionDetalladaComponent } from './modules/donacion/registar-donacion-detallada/registar-donacion-detallada.component';
import { RegistrarDonacionGeneralComponent } from './modules/donacion/registrar-donacion-general/registrar-donacion-general.component';
import { PerfilBeneficiarioComponent } from './modules/beneficiario/perfil-beneficiario/perfil-beneficiario.component';
import { PanelComponent } from "./modules/admin/panel/panel.component";
import { TrasladosSinVoluntarioComponent } from "./modules/admin/traslados-sin-voluntario/traslados-sin-voluntario.component";
import { TrasladosPendientesComponent } from './modules/admin/traslados-pendientes/traslados-pendientes.component';
import { AsignarTrasladoComponent } from './modules/voluntario/asignar-traslado/asignar-traslado.component';
import { RegistrarDonacionComponent } from './modules/donante/registrar-donacion/registrar-donacion.component';
import { NuevoEnvioPrincipalComponent } from './modules/admin/nuevo-envio/nuevo-envio-principal/nuevo-envio-principal.component';
import { AdminGuard } from './_guards/admin.guard';
import { VoluntarioGuard } from './_guards/voluntario.guard';
import { DonanteGuard } from './_guards/donante.guard';
import { BeneficiarioGuard } from './_guards/beneficiario.guard';
import { EditarVoluntarioComponent } from './modules/voluntario/editar-voluntario/editar-voluntario.component';
import { EditarDonanteComponent } from './modules/donante/editar-donante/editar-donante.component';
import { EditarBeneficiarioComponent } from './modules/beneficiario/editar-beneficiario/editar-beneficiario.component';
import { TrasladoAsignadoGuard } from './_guards/traslado-asignado.guard';
import { MisTrasladosComponent } from './modules/voluntario/mis-traslados/mis-traslados.component';
import { DonacionesRecibidasComponent } from './modules/beneficiario/donaciones-recibidas/donaciones-recibidas.component';
import { StockVentanaPrincipalComponent} from "./modules/admin/stock/stock-ventana-principal/stock-ventana-principal.component";
import { StockCargarProductoIndividualComponent} from "./modules/admin/stock/stock-cargar-producto-individual/stock-cargar-producto-individual.component";
import { StockCargarProductosDonacionComponent} from "./modules/admin/stock/stock-cargar-productos-donacion/stock-cargar-productos-donacion.component";
import { NuevoEnvioBeneficiarioComponent } from './modules/admin/nuevo-envio/nuevo-envio-beneficiario/nuevo-envio-beneficiario.component';

const routes: Routes = [
	{path:'',redirectTo:'/home',pathMatch:'full'},
	{path:'home',component:HomeComponent},
	{path:'registrar-donante',component:RegistrarDonanteComponent},
	{path:'perfil-donante',component:PerfilDonanteComponent, canActivate:[DonanteGuard]},
	{path:'mis-donaciones',component:MisDonacionesComponent, canActivate:[DonanteGuard]},
	{path:'registrar-donacion-detallada',component:RegistarDonacionDetalladaComponent, canActivate:[DonanteGuard]},
	{path:'registrar-donacion-general',component:RegistrarDonacionGeneralComponent, canActivate:[DonanteGuard]},
	{path:'registrar-beneficiario',component:RegistrarBeneficiarioComponent, canActivate:[AdminGuard]},
	{path:'registrar-voluntario',component:RegistrarVoluntarioComponent},
	{path:'login',component:LoginComponent},
	{path:'perfil-voluntario',component:PerfilVoluntarioComponent, canActivate:[VoluntarioGuard]},
	{path:'perfil-beneficiario',component:PerfilBeneficiarioComponent, canActivate:[BeneficiarioGuard]},
	{path:'ver-beneficiarios',component:VerBeneficiariosComponent, canActivate:[AdminGuard]},
	{path:'perfil-organizacion-beneficiaria',component:PerfilBeneficiarioComponent, canActivate:[BeneficiarioGuard]},
	{path:'buscar-voluntarios/:idTraslado/:origen/:destino',component:BuscarVoluntarioComponent, canActivate:[AdminGuard]},
	{path:'cambiar-clave',component:CambiarClaveComponent, canActivate:[AdminGuard]},
	{path:'ver-top',component:VerTopComponent},
	{path:'panel-de-control',component:PanelComponent, canActivate:[AdminGuard]},
	{path:'traslados-sin-voluntario',component:TrasladosSinVoluntarioComponent, canActivate:[AdminGuard]},
	{path:'traslados-pendientes',component:TrasladosPendientesComponent, canActivate:[AdminGuard]},
	{path:'traslados-pendientes/:userVoluntario',component:TrasladosPendientesComponent, canActivate:[AdminGuard]},
	{path:'asignar-traslado/:idTraslado',component:AsignarTrasladoComponent, canActivate:[VoluntarioGuard, TrasladoAsignadoGuard]},
	{path:'registrar-donacion',component:RegistrarDonacionComponent, canActivate:[DonanteGuard]},
	{path:'registrar-envio',component:NuevoEnvioPrincipalComponent, canActivate:[AdminGuard]},
	{path:'editar-voluntario',component:EditarVoluntarioComponent, canActivate:[VoluntarioGuard]},
	{path:'editar-beneficiario',component:EditarBeneficiarioComponent, canActivate:[BeneficiarioGuard]},	
	{path:'editar-donante',component:EditarDonanteComponent, canActivate:[DonanteGuard]},
	{path:'mis-traslados',component:MisTrasladosComponent, canActivate:[VoluntarioGuard]},
	{path:'donaciones-recibidas',component:DonacionesRecibidasComponent, canActivate:[BeneficiarioGuard]},
	{path:'ver-stock',component:StockVentanaPrincipalComponent, canActivate:[AdminGuard]},
	{path:'cargar-producto-a-stock',component:StockCargarProductoIndividualComponent, canActivate:[AdminGuard]},
	{path:'cargar-donacion-a-stock',component:StockCargarProductosDonacionComponent, canActivate:[AdminGuard]},
	{path:'nuevo-envio',component:NuevoEnvioBeneficiarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TrasladoAsignadoGuard, AdminGuard, BeneficiarioGuard, VoluntarioGuard, DonanteGuard]
})
export class AppRoutingModule { }
