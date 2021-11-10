import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contrato } from 'src/app/interfaces/contrato';
import { ContratosService } from 'src/app/servicios/contratos.service';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';
import { Inquilino } from 'src/app/interfaces/inquilino';
import { DateAdapter} from '@angular/material/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrato-dialog',
  templateUrl: './contrato-dialog.component.html',
  styleUrls: ['./contrato-dialog.component.css']
})
export class ContratoDialogComponent implements OnInit {

  //Variables
  contratoActivo: Contrato = {
    _id: '',
    tipo: true,
    noContrato: 0,
    fechaInicio: '',
    fechaCierre: '',
    saldo: 0,
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
      tipo: true,
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
  propiedades: Propiedad[] = [];
  inquilinos: Inquilino[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    contratoActivo: Contrato
  }, private matDialogRef: MatDialogRef<ContratoDialogComponent>,
  private contrService: ContratosService,
  private propService: PropiedadesService,
  private inquiService: InquilinosService,
  private dateAdapter: DateAdapter<Date>) {
    this.contratoActivo = data.contratoActivo;
    this.dateAdapter.setLocale('mx');
  }

  ngOnInit(): void {
    this.TraerPropiedades();
    this.TraerInquilinos();
  }

  //Custom Methods

  MostrarError(mensaje: string){
    $("#error_contrato").text(mensaje);
    $("#error_contrato").hide();
    $("#error_contrato").show("slow", function(){
      setTimeout(function(){
        $("#error_contrato").hide("slow");
      }, 1800)
    });
  }

  TraerPropiedades(){
    this.propService.GetPropiedades().subscribe(
      res =>{
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
    this.contratoActivo.noContrato = 0; 
    this.contratoActivo.fechaInicio = ''; 
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
    this.contratoActivo.inquilino.tipo = true;
    this.contratoActivo.inquilino.empresa = '';
    this.contratoActivo.inquilino.contacto.nombre = '';
    this.contratoActivo.inquilino.contacto.apellidos = '';
    this.contratoActivo.inquilino.contacto.correo = '';
    this.contratoActivo.inquilino.contacto.telefono1 = '';
    this.contratoActivo.inquilino.contacto.telefono2 = '';
  }

  ValidarFormulario(){
    const fInicio = $("#dtFInicio").val();
    const fCierre = $("#dtFCierre").val();
    const propiedad = $("#opcionesPropiedad").val();
    const inquilino = $("#opcionesInquilino").val();
    const deposito = $("#numCostoInicial").val();
    const renta = $("#numCostoPeriodo").val();

    if(fInicio == ""){
      this.MostrarError("El campo fecha inicio se encuentra vacío");
      return false;
    }

    if(fCierre == ""){
      this.MostrarError("El campo fecha cierre se encuentra vacío");
      return false;
    }

    if(propiedad == null){
      this.MostrarError("El campo propiedad se encuentra vacío");
      return false;
    }

    if(inquilino == null){
      this.MostrarError("El campo inquilino se encuentra vacío");
      return false;
    }

    if(deposito == ""){
      this.MostrarError("El campo depósito se encuentra vacío");
      return false;
    }

    if(renta == "" || renta == "0"){
      this.MostrarError("El campo costo renta se encuentra vacío");
      return false;
    }

    return true;
  }

  CrearContrato(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

    this.contrService.AgregarContrato(this.contratoActivo).subscribe(
      res => {
        if(res){
          Swal.fire({
            title: "Contrato creado",
            text: 'El contrato se ha creado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
        }
        else
          alert("Error al crear contrato");
      },
      err => console.log(err)
    );
  }

}
