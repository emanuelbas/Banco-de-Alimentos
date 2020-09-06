import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrarBeneficiarioComponent } from './modules/beneficiario/registrar-beneficiario/registrar-beneficiario.component';
import { RegistrarDonanteComponent } from './modules/donante/registrar-donante/registrar-donante.component';
import { RegistrarVoluntarioComponent } from './modules/voluntario/registrar-voluntario/registrar-voluntario.component';
import { LoginComponent } from './modules/login/login.component';
import { PerfilVoluntarioComponent } from './modules/voluntario/perfil-voluntario/perfil-voluntario.component';
import { BuscarVoluntarioComponent } from './modules/admin/buscar-voluntario/buscar-voluntario.component';
import { CambiarClaveComponent } from './modules/cuenta/cambiar-clave/cambiar-clave.component';
import { VerTopComponent } from './modules/topDonaciones/ver-top/ver-top.component';
import { SDKBrowserModule } from './_services/lbservice';
import { VerBeneficiariosComponent } from './modules/beneficiario/ver-beneficiarios/ver-beneficiarios.component';
import { PerfilDonanteComponent } from './modules/donante/perfil-donante/perfil-donante.component';
import { MisDonacionesComponent } from './modules/donante/mis-donaciones/mis-donaciones.component';
import { RegistarDonacionDetalladaComponent } from './modules/donacion/registar-donacion-detallada/registar-donacion-detallada.component';
import { RegistrarDonacionGeneralComponent } from './modules/donacion/registrar-donacion-general/registrar-donacion-general.component';
import { PerfilBeneficiarioComponent } from './modules/beneficiario/perfil-beneficiario/perfil-beneficiario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { PanelComponent } from './modules/admin/panel/panel.component';
import { TrasladosSinVoluntarioComponent } from './modules/admin/traslados-sin-voluntario/traslados-sin-voluntario.component';
import { TrasladosPendientesComponent } from './modules/admin/traslados-pendientes/traslados-pendientes.component';
import { RegistrarDonacionComponent } from './modules/donante/registrar-donacion/registrar-donacion.component';
import { NuevoTrasladoComponent } from './modules/admin/nuevo-traslado/nuevo-traslado.component';
import { SolicitudesTrasladoComponent } from './modules/voluntario/solicitudes-traslado/solicitudes-traslado.component';
import { ConfirmarTrasladoRealizadoComponent } from './modules/beneficiario/confirmar-traslado-realizado/confirmar-traslado-realizado.component';
import { AsignarTrasladoComponent } from './modules/voluntario/asignar-traslado/asignar-traslado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NuevoEnvioPrincipalComponent } from './modules/admin/nuevo-envio/nuevo-envio-principal/nuevo-envio-principal.component';
import { NuevoEnvioSeleccionarDonanteComponent } from './modules/admin/nuevo-envio/nuevo-envio-seleccionar-donante/nuevo-envio-seleccionar-donante.component';
import { NuevoEnvioSeleccionarDonacionComponent } from './modules/admin/nuevo-envio/nuevo-envio-seleccionar-donacion/nuevo-envio-seleccionar-donacion.component';
import { NuevoEnvioAPartirDeStockComponent } from './modules/admin/nuevo-envio/nuevo-envio-a-partir-de-stock/nuevo-envio-a-partir-de-stock.component';
import { NuevoEnvioItemsComponent } from './modules/admin/nuevo-envio/nuevo-envio-items/nuevo-envio-items.component';
import { EditarVoluntarioComponent } from './modules/voluntario/editar-voluntario/editar-voluntario.component';
import { EditarDonanteComponent } from './modules/donante/editar-donante/editar-donante.component';
import { MisTrasladosComponent } from './modules/voluntario/mis-traslados/mis-traslados.component';
import { DonacionesRecibidasComponent } from './modules/beneficiario/donaciones-recibidas/donaciones-recibidas.component';
import { EditarBeneficiarioComponent } from './modules/beneficiario/editar-beneficiario/editar-beneficiario.component';
import { NuevoEnvioVolumenComponent } from './modules/admin/nuevo-envio/nuevo-envio-volumen/nuevo-envio-volumen.component';
import { MockStockService } from './_services/stockservice/mock-stock.service';
import { LbStockService } from './_services/stockservice/lb-stock.service';
import { InsigniasService } from './_services/insignias.service';
import { HttpClientModule } from '@angular/common/http';
import { DataApiService } from './_services/data-api.service';
import { StockVentanaPrincipalComponent } from './modules/admin/stock/stock-ventana-principal/stock-ventana-principal.component';
import { StockCargarProductoIndividualComponent } from './modules/admin/stock/stock-cargar-producto-individual/stock-cargar-producto-individual.component';
import { StockCargarProductosDonacionComponent } from './modules/admin/stock/stock-cargar-productos-donacion/stock-cargar-productos-donacion.component';
import { NuevoEnvioBeneficiarioComponent } from './modules/admin/nuevo-envio/nuevo-envio-beneficiario/nuevo-envio-beneficiario.component';
// Material Design
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistrarBeneficiarioComponent,
    RegistrarDonanteComponent,
    RegistrarVoluntarioComponent,
    LoginComponent,
    PerfilVoluntarioComponent,
    VerBeneficiariosComponent,
    BuscarVoluntarioComponent,
    CambiarClaveComponent,
    VerTopComponent,
    PerfilDonanteComponent,
    MisDonacionesComponent,
    RegistarDonacionDetalladaComponent,
    RegistrarDonacionGeneralComponent,
    PerfilBeneficiarioComponent,
    PanelComponent,
    TrasladosSinVoluntarioComponent,
    TrasladosPendientesComponent,
    RegistrarDonacionComponent,
    NuevoTrasladoComponent,
    SolicitudesTrasladoComponent,
    ConfirmarTrasladoRealizadoComponent,
    AsignarTrasladoComponent,
    NuevoEnvioPrincipalComponent,
    NuevoEnvioSeleccionarDonanteComponent,
    NuevoEnvioSeleccionarDonacionComponent,
    NuevoEnvioAPartirDeStockComponent,
    NuevoEnvioItemsComponent,
    EditarVoluntarioComponent,
    EditarDonanteComponent,
    MisTrasladosComponent,
    DonacionesRecibidasComponent,
    EditarBeneficiarioComponent,
    NuevoEnvioVolumenComponent,
    StockVentanaPrincipalComponent,
    StockCargarProductoIndividualComponent,
    StockCargarProductosDonacionComponent,
    NuevoEnvioBeneficiarioComponent
  ],
  imports: [
    FontAwesomeModule,
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    AngularFileUploaderModule
  ],
  bootstrap: [AppComponent],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-AR'},MockStockService, InsigniasService, DataApiService, LbStockService]
})
export class AppModule { }


