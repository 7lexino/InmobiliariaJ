import { Component, OnInit } from '@angular/core';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';
import * as $ from 'jquery';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

  propiedades: Propiedad[] = [];
  propiedadActiva: Propiedad = {
    _id: '',
    predial: '',
    tipo: '',
    estadoRenta: 'Disponible',
    direccion: {
      calle: '',
      no_ext: 0,
      no_int: 0,
      colonia: '',
      c_p: 0,
      ciudad: '',
      estado: ''
    }
  };
  
  
  //Default Methods
  constructor(private propService: PropiedadesService) { }

  ngOnInit(): void {
    this.GetDisponibles();
  }

  //Custom Methods

  ClearFields(){
    this.propiedadActiva._id = '';
    this.propiedadActiva.predial = '';
    this.propiedadActiva.tipo = '';
    this.propiedadActiva.estadoRenta = 'Disponible';
    this.propiedadActiva.direccion.calle = '';
    this.propiedadActiva.direccion.no_ext = 0
    this.propiedadActiva.direccion.no_int = 0
    this.propiedadActiva.direccion.colonia = ''
    this.propiedadActiva.direccion.c_p = 0;
    this.propiedadActiva.direccion.ciudad = ''
    this.propiedadActiva.direccion.estado = ''
  }

  GetDisponibles(){
    this.propService.GetPropiedadesDisponibles().subscribe(
      res => {
        this.propiedades = res;
      },
      err => console.log(err)
    )
  }

  GetRentadas(){
    this.propService.GetPropiedadesRentadas().subscribe(
      res => {
        this.propiedades = res;
      },
      err => console.log(err)
    )
  }

  NuevaPropiedad(){
    $("#titleModalPropiedad").text("Nueva Propiedad");
    this.ClearFields();
  }

  CrearPropiedad(){
    this.propService.AgregarPropiedad(this.propiedadActiva).subscribe(
      res => {
        if(res){
          alert("Propiedad creada");
          $("#btnCloseModal").trigger("click");
          
          this.ClearFields();
          this.GetDisponibles();
        }
        else
          alert("Error al agregar propiedad");
      },
      err => console.log(err)
    )
  }

  ModificarPropiedad(propiedad: Propiedad){
    this.propService.ActualizarPropiedad(propiedad).subscribe(
      res => {
        console.log(res);
        if(res){
          alert("Propiedad actualizada");
          $("#btnCloseModal").trigger("click");
          
          this.ClearFields();
          this.GetDisponibles();
        }
        else
          alert("Error al actualizar la propiedad");
      },
      err => console.log(err)
    )
  }

  GuardarPropiedad(propiedad: Propiedad){
    if(propiedad._id == ''){ 
      console.log("Creando...");
      this.CrearPropiedad();
    }else{
      console.log("Modificando...");
      this.ModificarPropiedad(propiedad);
    }
  }

  VerPropiedad(propId: string){
    this.propService.GetPropiedad(propId).subscribe(
      res => {
        this.propiedadActiva = res;
        $("#titleModalPropiedad").text("Editar Propiedad");
      },
      err => console.log(err)
    )
  }

  EliminarPropiedad(propId: string){
    if(confirm("¿Realmente desea eliminar la propiedad?")){
      this.propService.BorrarPropiedad(propId).subscribe(
        res => {
          if(res){
            alert("Se ha eliminado correctamente");
            this.GetDisponibles();
          }else{
            alert("Sucedió un error al intentar eliminar la propiedad.");
          }
        },
        err => console.log(err)
      )
    }
  }
}