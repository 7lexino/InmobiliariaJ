import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Mantenimiento } from 'src/app/interfaces/mantenimiento';
import { Pago } from 'src/app/interfaces/pago';
import { Propiedad } from 'src/app/interfaces/propiedad';
import { AuthService } from 'src/app/servicios/auth.service';
import { MantenimientosService } from 'src/app/servicios/mantenimientos.service';
import { PagosService } from 'src/app/servicios/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento-dialog',
  templateUrl: './mantenimiento-dialog.component.html',
  styleUrls: ['./mantenimiento-dialog.component.css']
})
export class MantenimientoDialogComponent implements OnDestroy, OnInit {

  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  totalMtto: number = 0;

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

  egresoActivo: Pago = {
    _id: '',
    fecha: '',
    metodoPago: '', //Aquí se utilizará como conepto del egreso
    monto: 0
  }

  //Default methods
  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    propiedadActiva: Propiedad
  }, private mttoService: MantenimientosService, public authService: AuthService, public pagoService: PagosService) {
    this.propiedadActiva = data.propiedadActiva;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']],
      language: {
        url: '../../../assets/lang/datatable_lang.json'
      }
    };
    this.GetMantenimientos();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Custom Methods

  ClearFields(){
    this.egresoActivo._id = '';
    this.egresoActivo.fecha = '';
    this.egresoActivo.metodoPago = '';
    this.egresoActivo.monto = 0;
  }

  MostrarError(mensaje: string){
    $("#error_mtto").text(mensaje);
    $("#error_mtto").hide();
    $("#error_mtto").show("slow", function(){
      setTimeout(function(){
        $("#error_mtto").hide("slow");
      }, 1800)
    });
  }

  ValidarFormulario(){
    const descripcion = $("#txtDescripcion").val();
    const costo = $("#txtCosto").val();
    const fecha = $("#dtFecha").val();
    
    if(descripcion == ""){
      this.MostrarError("El campo descripción se encuentra vacío");
      return false;
    }

    if(costo == "" || costo == "0"){
      this.MostrarError("El campo costo se encuentra vacío");
      return false;
    }

    if(fecha == ""){
      this.MostrarError("El campo fecha se encuentra vacío");
      return false;
    }

    return true;
  }

  ClearFieldsMtto(){
    this.mantenimientoActivo._id = '';
    this.mantenimientoActivo.fecha = '';
    this.mantenimientoActivo.descripcion = '';
    this.mantenimientoActivo.costo = 0;
  }
  
  GetMantenimientos(){
    if($.fn.dataTable.isDataTable('#dtMantenimientos')){
      var table = $("#dtMantenimientos").DataTable();
      table.destroy();
    }
    this.mttoService.GetTodosByProp(this.propiedadActiva._id).subscribe(
      res => {
        this.mantenimientos = res;
        //Sumar para obtener el total
        for(var i = 0; i < this.mantenimientos.length; i++){
          this.totalMtto += this.mantenimientos[i].costo;
        }
        this.dtTrigger.next();
      },
      err => console.log(err)
    )
  }

  AgregarMantenimiento(){
    this.mttoService.CrearMantenimiento(this.mantenimientoActivo).subscribe(
      res => {
        this.GenerarEgreso();
        Swal.fire({
          title: "Mantenimiento registrado", 
          text: 'El mantenimiento se ha registrado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ClearFieldsMtto();
        this.GetMantenimientos();
      },
      err => console.log(err)
    )
  }

  ActualizarMantenimiento(){
    this.mttoService.UpdateMantenimiento(this.mantenimientoActivo).subscribe(
      res =>{
        Swal.fire({
          title: "Mantenimiento actualizado", 
          text: 'El mantenimiento se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.GetMantenimientos();
      },
      err => console.log(err)
    )
  }

  GuardarMantenimiento(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

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
            Swal.fire({
              title: "Mantenimiento eliminado", 
              text: 'El mantenimiento se ha eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.GetMantenimientos();
          }
        },
        err => console.log(err)
      )
    }
  }

  GenerarEgreso(){
    this.egresoActivo.fecha = this.mantenimientoActivo.fecha;
    this.egresoActivo.metodoPago = "Mantenimiento: " + this.mantenimientoActivo.descripcion;
    this.egresoActivo.monto = this.mantenimientoActivo.costo;

    this.pagoService.CrearPago(this.egresoActivo, 0).subscribe(
      res => {
        this.ClearFields();
        //this.matDialogRef.close(true);
      },
      err => console.log(err)
    )
  }

}