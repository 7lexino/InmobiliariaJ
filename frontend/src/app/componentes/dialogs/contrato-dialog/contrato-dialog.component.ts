import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contrato } from 'src/app/interfaces/contrato';
import * as $ from 'jquery';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ContratosService } from 'src/app/servicios/contratos.service';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';
import { Inquilino } from 'src/app/interfaces/inquilino';

@Component({
  selector: 'app-contrato-dialog',
  templateUrl: './contrato-dialog.component.html',
  styleUrls: ['./contrato-dialog.component.css']
})
export class ContratoDialogComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

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
  propiedades: Propiedad[] = [];
  inquilinos: Inquilino[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    contratoActivo: Contrato
  }, private matDialogRef: MatDialogRef<ContratoDialogComponent>,
  private contrService: ContratosService,
  private propService: PropiedadesService,
  private inquiService: InquilinosService) {
    //
    this.contratoActivo = data.contratoActivo;
    //this.contratoActivo.fechaInicio = this.contratoActivo.fechaInicio.toLocaleString();
  }

  ngOnInit(): void {
    this.PropiedadesDisponibles();
    this.TraerInquilinos();
  }

  //Custom Methods

  PropiedadesDisponibles(){
    this.propService.GetPropiedadesDisponibles().subscribe(
      res => {
        this.propiedades = res;
      },
      err => console.log(err)
    )
  }

  TraerInquilinos(){
    this.inquiService.GetInquilinos().subscribe(
      res => {
        this.inquilinos = res;
      },
      err => console.log(err)
    )
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
  }

  CrearContrato(){
    this.contrService.AgregarContrato(this.contratoActivo).subscribe(
      res => {
        if(res){
          alert("Contrato creado");
          this.ClearFields();
          // this.GetActivos();
        }
        else
          alert("Error al crear contrato");
      },
      err => console.log(err)
    )
  }

}
