import { Component, OnInit } from '@angular/core';
import { Inquilino } from 'src/app/interfaces/inquilino';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';
//import * as $ from 'jquery';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

  inquilinos: Inquilino[] = [];
  inquilinoActivo: Inquilino = {
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
  };
  
  
  //Default Methods
constructor(private inquiService: InquilinosService) { }

  ngOnInit(): void {
    this.GetTodos();
  }

  //Custom Methods

  ClearFields(){
    this.inquilinoActivo._id = '';
    this.inquilinoActivo.tipo = true; //Individuo o Empresa
    this.inquilinoActivo.empresa = ''; //Nombre de la Compañía
    this.inquilinoActivo.contacto.nombre = '';
    this.inquilinoActivo.contacto.apellidos = '';
    this.inquilinoActivo.contacto.correo = '';
    this.inquilinoActivo.contacto.telefono1 = '';
    this.inquilinoActivo.contacto.telefono2 = '';
    
  }

  GetTodos(){
    this.inquiService.GetInquilinos().subscribe(
      res => {
        this.inquilinos = res;
      },
      err => console.log(err)
    )
  }

  NuevoInquilino(){
    $("#titleModalInquilino").text("Nuevo Inquilino");
    $("#txtCompania").prop("disabled", false);
    $("#radPersona").prop("disabled", false);
    $("#radEmpresa").prop("disabled", false);
    this.ClearFields();
  }

  CrearInquilino(){
    this.inquiService.AgregarInquilino(this.inquilinoActivo).subscribe(
      res => {
        if(res){
          alert("Inquilino creado");
          $("#btnCloseModal").trigger("click");
          
          this.ClearFields();
          this.GetTodos();
        }
        else
          alert("Error al crear inquilino");
      },
      err => console.log(err)
    )
  }

  ModificarInquilino(inquilino: Inquilino){
    this.inquiService.ActualizarInquilino(inquilino).subscribe(
      res => {
        console.log(res);
        if(res){
          alert("Inquilino modificado");
          $("#btnCloseModal").trigger("click");
          
          this.ClearFields();
          this.GetTodos();
        }
        else
          alert("Error al modificar el inquilino");
      },
      err => console.log(err)
    )
  }

  GuardarInquilino(inquilino: Inquilino){
    if(inquilino._id == ''){ 
      this.CrearInquilino();
    }else{
      this.ModificarInquilino(inquilino);
    }
  }

  VerInquilino(inquiId: string){
    $("#titleModalInquilino").text("Editar Inquilino");
    $("#txtCompania").prop("disabled", true);
    $("#radPersona").prop("disabled", true);
    $("#radEmpresa").prop("disabled", true);
    this.inquiService.GetInquilino(inquiId).subscribe(
      res => {
        this.inquilinoActivo = res;
      },
      err => console.log(err)
    )
  }

  EliminarInquilino(inquiId: string){
    if(confirm("¿Realmente desea eliminar el Inquilino?")){
      this.inquiService.BorrarInquilino(inquiId).subscribe(
        res => {
          if(res){
            alert("Se ha eliminado correctamente");
            this.GetTodos();
          }else{
            alert("Sucedió un error al intentar eliminar el inquilino.");
          }
        },
        err => console.log(err)
      )
    }
  }

}
