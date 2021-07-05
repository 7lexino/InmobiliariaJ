import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog'

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
