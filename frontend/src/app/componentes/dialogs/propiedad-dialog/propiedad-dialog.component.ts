import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { AuthService } from 'src/app/servicios/auth.service';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propiedad-dialog',
  templateUrl: './propiedad-dialog.component.html',
  styleUrls: ['./propiedad-dialog.component.css']
})
export class PropiedadDialogComponent implements OnInit {

  //Variables
  propiedades: Propiedad[] = [];
  propiedadActiva: Propiedad = {
    _id: '',
    predial: '',
    tipo: '',
    estadoRenta: 'Disponible',
    direccion: {
      calle: '',
      no_ext: '',
      no_int: '',
      colonia: '',
      c_p: 0,
      ciudad: '',
      estado: ''
    }
  };

  //Default methods

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    propiedadActiva: Propiedad
  }, private matDialogRef: MatDialogRef<PropiedadDialogComponent>, 
    private propService:PropiedadesService,
    public authService:AuthService) {
    this.propiedadActiva = data.propiedadActiva;
  }

  ngOnInit(): void {
    
  }

  //Custom Methods

  MostrarError(mensaje: string){
    $("#error_propiedad").text(mensaje);
    $("#error_propiedad").hide();
    $("#error_propiedad").show("slow", function(){
      setTimeout(function(){
        $("#error_propiedad").hide("slow");
      }, 1800)
    });
  }

  ClearFields(){
    this.propiedadActiva._id = '';
    this.propiedadActiva.predial = '';
    this.propiedadActiva.tipo = '';
    this.propiedadActiva.estadoRenta = 'Disponible';
    this.propiedadActiva.direccion.calle = '';
    this.propiedadActiva.direccion.no_ext = ''
    this.propiedadActiva.direccion.no_int = ''
    this.propiedadActiva.direccion.colonia = ''
    this.propiedadActiva.direccion.c_p = 0;
    this.propiedadActiva.direccion.ciudad = ''
    this.propiedadActiva.direccion.estado = ''
  }

  ValidarFormulario(){
    const predial = $("#numPredial").val();
    const tipo = $("#cbxTipo").val();
    const calle = $("#txtCalle").val();
    const noExt = $("#numExt").val();
    const ciudad = $("#txtCiudad").val();
    const estado = $("#cbxEstado").val();

    if(predial == ""){
      this.MostrarError("El campo predial se encuentra vacío");
      return false;
    }

    if(tipo == ""){
      this.MostrarError("Debe seleccionar un tipo de propiedad");
      return false;
    }

    if(calle == ""){
      this.MostrarError("El campo calle se encuentra vacío");
      return false;
    }

    if(noExt == ""){
      this.MostrarError("El campo núm. ext. se encuentra vacío");
      return false;
    }

    if(ciudad == ""){
      this.MostrarError("El campo ciudad se encuentra vacío");
      return false;
    }

    if(estado == ""){
      this.MostrarError("Debe seleccionar un estado");
      return false;
    }

    return true;
  }

  GuardarPropiedad(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

    if(this.propiedadActiva._id == ''){ 
      this.CrearPropiedad();
    }else{
      this.ModificarPropiedad(this.propiedadActiva);
    }
  }

  CrearPropiedad(){
    this.propService.AgregarPropiedad(this.propiedadActiva).subscribe(
      res => {
        if(res){
          Swal.fire({
            title: "Propiedad creada",
            text: 'La propiedad se ha creado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
        }
        else
          alert("Error al crear propiedad");
      },
      err => console.log(err)
    )
  }

  ModificarPropiedad(propiedad: Propiedad){
    this.propService.ActualizarPropiedad(propiedad).subscribe(
      res => {
        console.log(res);
        if(res){
          Swal.fire({
            title: "Actualizada",
            text: 'La propiedad se ha actualizado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
        }
        else
          alert("Error al actualizar la propiedad");
      },
      err => console.log(err)
    )
  }

}