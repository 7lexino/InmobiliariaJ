import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Mantenimiento } from 'src/app/interfaces/mantenimiento';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';
import { MttoIndividualDialogComponent } from '../mtto-individual-dialog/mtto-individual-dialog.component';

@Component({
  selector: 'app-mantenimiento-dialog',
  templateUrl: './mantenimiento-dialog.component.html',
  styleUrls: ['./mantenimiento-dialog.component.css']
})
export class MantenimientoDialogComponent implements OnInit {

  //Variables
  faEye = faEye;
  faTrashAlt = faTrashAlt;
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
  mantenimientos: Mantenimiento[] = [];
  mantenimientoActivo: Mantenimiento = {
    _id: '',
    fecha: '',
    descripcion: '',
    costo: 0,
    propiedadId: ''
  };

  //Default methods
  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    propiedadActiva: Propiedad
  }, private matDialogRef: MatDialogRef<MantenimientoDialogComponent>, private mttoService: MantenimientosService) {
    this.propiedadActiva = data.propiedadActiva;
  }

  ngOnInit(): void {
    this.GetMantenimientos();
  }

  //Custom Methods
  ClearFieldsMtto(){
    this.mantenimientoActivo._id = '';
    this.mantenimientoActivo.fecha = '';
    this.mantenimientoActivo.descripcion = '';
    this.mantenimientoActivo.costo = 0;
  }
  
  GetMantenimientos(){
    //console.log(this.propiedadActiva);
    this.mttoService.GetTodosByProp(this.propiedadActiva._id).subscribe(
      res => {
        this.mantenimientos = res;
      },
      err => console.log(err)
    )
  }

  AgregarMantenimiento(){
    this.mttoService.CrearMantenimiento(this.mantenimientoActivo).subscribe(
      res => {
        alert("Mantenimiento agregado");
        this.ClearFieldsMtto();
        this.GetMantenimientos();
      },
      err => console.log(err)
    )
  }

  ActualizarMantenimiento(){
    this.mttoService.UpdateMantenimiento(this.mantenimientoActivo).subscribe(
      res =>{
        alert("¡Mantenimiento actualizado!");
        this.GetMantenimientos();
      },
      err => console.log(err)
    )
  }

  GuardarMantenimiento(){
    this.mantenimientoActivo.propiedadId = this.propiedadActiva._id;
    //console.log(this.mantenimientoActivo.propiedadId);
    if(this.mantenimientoActivo._id === ''){
      this.AgregarMantenimiento();
    }else{
      this.ActualizarMantenimiento();
    }
  }

  VerMantenimiento(mttoId: string){
    this.mttoService.GetMantenimiento(mttoId).subscribe(
      res => {
        this.mantenimientoActivo = res;
      },
      err => console.log(err)
    )
  }

  EliminarMantenimiento(mttoId: string){
    if(confirm("¿Realmente desea eliminar el mantenimiento?")){
      this.mttoService.DeleteMantenimiento(mttoId).subscribe(
        res => {
          if(res == true){
            alert("Se ha eliminado correctamente");
            this.GetMantenimientos();
          }
        },
        err => console.log(err)
      )
    }
  }

}