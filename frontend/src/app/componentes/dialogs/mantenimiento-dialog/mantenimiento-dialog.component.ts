import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Mantenimiento } from 'src/app/interfaces/mantenimiento';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { AuthService } from 'src/app/servicios/auth.service';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';

@Component({
  selector: 'app-mantenimiento-dialog',
  templateUrl: './mantenimiento-dialog.component.html',
  styleUrls: ['./mantenimiento-dialog.component.css']
})
export class MantenimientoDialogComponent implements OnDestroy, OnInit {

  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

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
  }, private mttoService: MantenimientosService, public authService: AuthService) {
    this.propiedadActiva = data.propiedadActiva;
  }

  ngOnInit(): void {
    this.GetMantenimientos();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']],
      language: {
        url: '../../../assets/lang/datatable_lang.json'
      }
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Custom Methods
  ClearFieldsMtto(){
    this.mantenimientoActivo._id = '';
    this.mantenimientoActivo.fecha = '';
    this.mantenimientoActivo.descripcion = '';
    this.mantenimientoActivo.costo = 0;
  }
  
  GetMantenimientos(){
    this.mttoService.GetTodosByProp(this.propiedadActiva._id).subscribe(
      res => {
        this.mantenimientos = res;
        this.dtTrigger.next();
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
    if(this.mantenimientoActivo._id === ''){
      this.AgregarMantenimiento();
    }else{
      if(this.authService.GetUsuario().rango >= this.authService.eRangos.editor)
        this.ActualizarMantenimiento();
      else
        alert("Permisos insuficientes para editar mantenimientos.");
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