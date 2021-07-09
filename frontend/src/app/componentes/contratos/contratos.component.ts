import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/interfaces/contrato';
import { ContratosService } from 'src/app/servicios/contratos.service';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ContratoDialogComponent } from '../dialogs/contrato-dialog/contrato-dialog.component';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { AuthService } from 'src/app/servicios/auth.service';

//Usar Angular Material para componente datepicker y otros componentes

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

  contratos: Contrato[] = [];
  contratoActivo: Contrato = {
    _id: '',
    tipo: true,
    noContrato: 0,
    fechaInicio: '',
    fechaCierre: '',
    aval: {
        nombre: '',
        correo: '',
        telefono1: '',
        telefono2: '',
    },
    costoInicial: 0,
    costoPeriodo: 0,
    propiedad: {
      _id: '',
      predial: '',
      direccion: {
          calle: '',
          no_ext: '',
          no_int: '',
          colonia: '',
          c_p: 0,
          ciudad: '',
          estado: ''
        }
    },
    inquilino: {
      _id: '',
      empresa: '',
      contacto: {
          nombre: '',
          apellidos: '',
          correo: '',
          telefono1: '',
          telefono2: '',
      }
    }
  };
  
  
  //Default Methods
constructor(public authService:AuthService, private contrService: ContratosService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.VerificarToken();
    this.GetActivos();
  }

  //Custom Methods

  NuevoContrato(){
    this.ClearFields();
    const dialogRef = this.matDialog.open(ContratoDialogComponent, {
      data: {
        tituloVentana: "Nuevo Contrato",
        contratoActivo: this.contratoActivo
      },
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(res => {
      this.GetActivos();
    });
  }

  ClearFields(){
    this.contratoActivo._id = '';
    this.contratoActivo.tipo = true;
    this.contratoActivo.noContrato = 0; //Individuo o Empresa
    this.contratoActivo.fechaInicio = ''; //Nombre de la Compañía
    this.contratoActivo.fechaCierre = '';
    this.contratoActivo.aval.nombre = '';
    this.contratoActivo.aval.correo = '';
    this.contratoActivo.aval.telefono1 = '';
    this.contratoActivo.aval.telefono2 = '';
    this.contratoActivo.costoInicial = 0;
    this.contratoActivo.costoPeriodo = 0;
    this.contratoActivo.propiedad._id = '';
    this.contratoActivo.propiedad.predial = '';
    this.contratoActivo.propiedad.direccion.c_p = 0;
    this.contratoActivo.propiedad.direccion.calle = '';
    this.contratoActivo.propiedad.direccion.ciudad = '';
    this.contratoActivo.propiedad.direccion.colonia = '';
    this.contratoActivo.propiedad.direccion.estado = '';
    this.contratoActivo.propiedad.direccion.no_ext = '';
    this.contratoActivo.propiedad.direccion.no_int = '';
    this.contratoActivo.inquilino._id = '';
    this.contratoActivo.inquilino.empresa = '';
    this.contratoActivo.inquilino.contacto.nombre = '';
    this.contratoActivo.inquilino.contacto.apellidos = '';
    this.contratoActivo.inquilino.contacto.correo = '';
    this.contratoActivo.inquilino.contacto.telefono1 = '';
    this.contratoActivo.inquilino.contacto.telefono2 = '';
  }

  GetActivos(){
    this.contrService.GetContratosActivos().subscribe(
      res => {
        this.contratos = res;
      },
      err => console.log(err)
    )
  }

  GetPorVencer(){
    this.contrService.GetContratosPorVencer().subscribe(
      res => {
        this.contratos = res;
        console.log(this.contratos);
      },
      err => console.log(err)
    )
  }

  GetArchivados(){
    this.contrService.GetContratosArchivados().subscribe(
      res => {
        this.contratos = res;
      },
      err => console.log(err)
    )
  }

  VerContrato(contrId: string){
    this.contrService.GetContrato(contrId).subscribe(
      res => {
        this.contratoActivo = res;
        const dialogRef = this.matDialog.open(ContratoDialogComponent, {
          data: {
            tituloVentana: "Detalles",
            contratoActivo: this.contratoActivo
          },
          width: "700px"
        });
        dialogRef.afterClosed().subscribe(res => {
          this.GetActivos();
        });
      },
      err => console.log(err)
    )
  }

}
