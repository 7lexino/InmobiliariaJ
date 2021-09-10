import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/interfaces/pago';
import { Transaccion } from 'src/app/interfaces/transaccion';
import { AuthService } from 'src/app/servicios/auth.service';
import { PagosService } from 'src/app/servicios/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egreso-dialog',
  templateUrl: './egreso-dialog.component.html',
  styleUrls: ['./egreso-dialog.component.css']
})
export class EgresoDialogComponent implements OnInit {

  //Variables
  egresoActivo: Pago = {
    _id: '',
    fecha: '',
    metodoPago: '', //Aquí se utilizará como conepto del egreso
    monto: 0
  }

  //Default methods
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    tituloVentana: string
  }, private matDialogRef: MatDialogRef<EgresoDialogComponent>, public authService: AuthService, private pagoService: PagosService,
  private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('mx');
  }

  ngOnInit(): void {
  }

  //Custom methods

  MostrarError(mensaje: string){
    $("#error_egreso").text(mensaje);
    $("#error_egreso").hide();
    $("#error_egreso").show("slow", function(){
      setTimeout(function(){
        $("#error_egreso").hide("slow");
      }, 1800)
    });
  }

  ClearFields(){
    this.egresoActivo._id = '';
    this.egresoActivo.fecha = '';
    this.egresoActivo.metodoPago = '';
    this.egresoActivo.monto = 0;
  }

  ValidarFormulario(){
    const fEgreso = $("#dtFechaEgreso").val();
    const metodoPago = $("#txtConcepto").val();
    const importe = $("#nTotal").val();

    if(fEgreso == ""){
      this.MostrarError("El campo fecha se encuentra vacío");
      return false;
    }

    if(metodoPago == null || metodoPago == "0"){
      this.MostrarError("Seleccione un método de pago");
      return false;
    }

    if(importe == "" || importe == "0"){
      this.MostrarError("El campo importe se encuentra vacío");
      return false;
    }

    return true;
  }

  GenerarEgreso(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

    this.pagoService.CrearPago(this.egresoActivo, 0).subscribe(
      res => {
        Swal.fire({
          title: "Egreso registrado", 
          text: 'El egreso se ha registrado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ClearFields();
        this.matDialogRef.close(true);
      },
      err => console.log(err)
    )
  }

}
