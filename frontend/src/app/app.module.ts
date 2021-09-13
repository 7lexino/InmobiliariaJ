import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables'
// require('datatables.net-dt');
// require('datatables.net-buttons-dt');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HeaderComponent } from './componentes/header/header.component';
import { PropiedadesComponent } from './componentes/propiedades/propiedades.component';
import { InquilinosComponent } from './componentes/inquilinos/inquilinos.component';
import { FacturasComponent } from './componentes/facturas/facturas.component';
import { ContratosComponent } from './componentes/contratos/contratos.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ContratoDialogComponent } from './componentes/dialogs/contrato-dialog/contrato-dialog.component';
import { InquilinoDialogComponent } from './componentes/dialogs/inquilino-dialog/inquilino-dialog.component';
import { PropiedadDialogComponent } from './componentes/dialogs/propiedad-dialog/propiedad-dialog.component';
import { MantenimientoDialogComponent } from './componentes/dialogs/mantenimiento-dialog/mantenimiento-dialog.component';
import { PagosComponent } from './componentes/pagos/pagos.component';
import { RemisionesComponent } from './componentes/remisiones/remisiones.component';
import { RemisionDialogComponent } from './componentes/dialogs/remision-dialog/remision-dialog.component';
import { EstadoCuentaComponent } from './componentes/estado-cuenta/estado-cuenta.component';
import { PagoDialogComponent } from './componentes/dialogs/pago-dialog/pago-dialog.component';
import { ClaveRegistroDialogComponent } from './componentes/dialogs/clave-registro-dialog/clave-registro-dialog.component';
import { EdoCuentaEmpresaComponent } from './componentes/edo-cuenta-empresa/edo-cuenta-empresa.component';
import { EgresoDialogComponent } from './componentes/dialogs/egreso-dialog/egreso-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    HeaderComponent,
    PropiedadesComponent,
    InquilinosComponent,
    FacturasComponent,
    ContratosComponent,
    ContratoDialogComponent,
    InquilinoDialogComponent,
    PropiedadDialogComponent,
    MantenimientoDialogComponent,
    PagosComponent,
    RemisionesComponent,
    RemisionDialogComponent,
    EstadoCuentaComponent,
    PagoDialogComponent,
    ClaveRegistroDialogComponent,
    EdoCuentaEmpresaComponent,
    EgresoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
