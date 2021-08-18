import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inquilino } from 'src/app/interfaces/inquilino';
import { AuthService } from 'src/app/servicios/auth.service';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inquilino-dialog',
  templateUrl: './inquilino-dialog.component.html',
  styleUrls: ['./inquilino-dialog.component.css']
})
export class InquilinoDialogComponent implements OnInit {

  //Variables
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    inquilinoActivo: Inquilino
  }, private matDialogRef: MatDialogRef<InquilinoDialogComponent>,
    private inquiService: InquilinosService,
    public authService:AuthService) {
      //
      this.inquilinoActivo = data.inquilinoActivo;
    }

  ngOnInit(): void {
  }

  //Custom Methods

  MostrarError(mensaje: string){
    $("#error_inquilino").text(mensaje);
    $("#error_inquilino").hide();
    $("#error_inquilino").show("slow", function(){
      setTimeout(function(){
        $("#error_inquilino").hide("slow");
      }, 1800)
    });
  }

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

  ValidarFormulario(){
    const nombreCompania = $("#txtCompania").val();
    const nombre = $("#txtNombre").val();
    const correo = $("#txtCorreo").val();
    const tel1 = $("#txtTel1").val();

    if($("#radEmpresa").is(":checked")){
      if(nombreCompania == ""){
        this.MostrarError("El campo nombre compañía se encuentra vacío");
        return false;  
      }
    }

    if(nombre == ""){
      this.MostrarError("El campo nombre se encuentra vacío");
      return false;
    }

    if(correo == ""){
      this.MostrarError("El campo correo se encuentra vacío");
      return false;
    }

    if(tel1 == ""){
      this.MostrarError("El campo teléfono 1 se encuentra vacío");
      return false;
    }

    return true;
  }

  GuardarInquilino(inquilino: Inquilino){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

    if(inquilino._id == ''){ 
      this.CrearInquilino();
    }else{
      this.ModificarInquilino(inquilino);
    }
  }

  CrearInquilino(){
    this.inquiService.AgregarInquilino(this.inquilinoActivo).subscribe(
      res => {
        if(res){
          Swal.fire({
            title: "Inquilino creado",
            text: 'El inquilino se ha creado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
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
          Swal.fire({
            title: "Actualizado",
            text: 'El inquilino se ha actualizado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
        }
        else
          alert("Error al modificar el inquilino");
      },
      err => console.log(err)
    )
  }

}
