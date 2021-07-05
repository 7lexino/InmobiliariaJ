import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { PropiedadesService } from 'src/app/servicios/propiedades.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    propiedadActiva: Propiedad
  }, private matDialogRef: MatDialogRef<PropiedadDialogComponent>, 
    private propService:PropiedadesService) {
    //
    this.propiedadActiva = data.propiedadActiva;
  }

  ngOnInit(): void {
  }

  //Custom Methods

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

  GuardarPropiedad(propiedad: Propiedad){
    if(propiedad._id == ''){ 
      this.CrearPropiedad();
    }else{
      this.ModificarPropiedad(propiedad);
    }
  }

  CrearPropiedad(){
    this.propService.AgregarPropiedad(this.propiedadActiva).subscribe(
      res => {
        if(res){
          alert("Propiedad creada");
          this.ClearFields();
          this.matDialogRef.close();
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
          alert("Propiedad actualizada");
          this.ClearFields();
          this.matDialogRef.close();
        }
        else
          alert("Error al actualizar la propiedad");
      },
      err => console.log(err)
    )
  }

}
