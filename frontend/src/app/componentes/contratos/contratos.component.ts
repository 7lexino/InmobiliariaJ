import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/interfaces/contrato';
import { ContratosService } from 'src/app/servicios/contratos.service';
import * as $ from 'jquery';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ContratoDialogComponent } from '../dialogs/contrato-dialog/contrato-dialog.component';
import { Propiedad } from 'src/app/interfaces/propiedad';

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
    propiedadId: '',
    propiedad: [{
      _id: '',
      predial: '',
      tipo: '',
      estadoRenta: '',
      direccion: {
          calle: '',
          no_ext: '',
          no_int: '',
          colonia: '',
          c_p: 0,
          ciudad: '',
          estado: ''
      }
    }],
    inquilinoId: '',
    inquilino: [{
      _id: '',
      tipo: true, //Individuo o Empresa
      empresa: '', //Nombre de la Compañía
      contacto: { //Información personal del contacto
          nombre: '',
          apellidos: '',
          correo: '',
          telefono1: '',
          telefono2: '',
      }
    }]
  };
  
  
  //Default Methods
constructor(private contrService: ContratosService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.GetActivos();
  }
  
  ngAfterViewInit(): void{
    // ($("#txtFInicio") as any).datepicker();
    //$("#ui-datepicker-div").css("background-color", "#FFF");
  }

  //Custom Methods

  AbrirContratoDialog(){
    this.ClearFields();
    this.matDialog.open(ContratoDialogComponent, {
      data: {
        tituloVentana: "Nuevo Contrato",
        contratoActivo: this.contratoActivo
      },
      width: "700px"
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
    this.contratoActivo.propiedadId = '';
    this.contratoActivo.inquilinoId = '';
  }

  GetActivos(){
    this.contrService.GetContratosActivos().subscribe(
      res => {
        this.contratos = res;
      },
      err => console.log(err)
    )
  }

  // NuevoContrato(){
  //   $("#titleModalContrato").text("Nuevo Contrato");
  //   // $("#txtCompania").prop("disabled", false);
  //   // $("#radPersona").prop("disabled", false);
  //   // $("#radEmpresa").prop("disabled", false);
  //   this.ClearFields();
  // }

  // CrearContrato(contrato: Contrato){
  //   this.contrService.AgregarContrato(this.contratoActivo).subscribe(
  //     res => {
  //       if(res){
  //         alert("Contrato creado");
  //         $("#btnCloseModal").trigger("click");
          
  //         this.ClearFields();
  //         this.GetActivos();
  //       }
  //       else
  //         alert("Error al crear contrato");
  //     },
  //     err => console.log(err)
  //   )
  // }

  VerContrato(contrId: string){
    this.contrService.GetContrato(contrId).subscribe(
      res => {
        this.contratoActivo = res;
        this.matDialog.open(ContratoDialogComponent, {
          data: {
            tituloVentana: "Detalles",
            contratoActivo: this.contratoActivo
          },
          width: "700px"
        });
      },
      err => console.log(err)
    )
  }

}
