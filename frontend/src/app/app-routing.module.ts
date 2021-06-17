import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

//Components
import { SigninComponent } from './componentes/signin/signin.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { PropiedadesComponent } from './componentes/propiedades/propiedades.component';
import { InquilinosComponent } from './componentes/inquilinos/inquilinos.component';
import { FacturasComponent } from './componentes/facturas/facturas.component';
import { ContratosComponent } from './componentes/contratos/contratos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/entrar',
    pathMatch: 'full'
  },
  {
    path: 'registrar',
    component: SignupComponent
  },
  {
    path: 'entrar',
    component: SigninComponent
  },
  {
    path: 'escritorio',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'propiedades',
    component: PropiedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inquilinos',
    component: InquilinosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'facturas',
    component: FacturasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contratos',
    component: ContratosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
