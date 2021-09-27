import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/interfaces/pago';
import { AuthService } from 'src/app/servicios/auth.service';
import { PagosService } from 'src/app/servicios/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-dialog',
  templateUrl: './pago-dialog.component.html',
  styleUrls: ['./pago-dialog.component.css']
})
export class PagoDialogComponent implements OnInit {

  //Variables
  pagoActivo: Pago = {
    _id: '',
    fecha: '',
    metodoPago: '',
    monto: 0
  }

  //Default methods

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    tituloVentana: string,
    noContrato: number
  }, private matDialogRef: MatDialogRef<PagoDialogComponent>, private pagoService: PagosService, public authService: AuthService,
  private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('mx');
  }

  ngOnInit(): void {
  }

  //Custom methods

  MostrarError(mensaje: string){
    $("#error_pago").text(mensaje);
    $("#error_pago").hide();
    $("#error_pago").show("slow", function(){
      setTimeout(function(){
        $("#error_pago").hide("slow");
      }, 1800)
    });
  }

  ClearFields(){
    this.pagoActivo._id = '';
    this.pagoActivo.fecha = '';
    this.pagoActivo.metodoPago = '';
    this.pagoActivo.monto = 0;
  }

  ValidarFormulario(){
    const fPago = $("#dtFechaPago").val();
    const metodoPago = $("#selMetodoPago").val();
    const importe = $("#nTotal").val();

    if(fPago == ""){
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

  async CrearPago(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }
    
    this.pagoService.CrearPago(this.pagoActivo, this.data.noContrato).subscribe(
      res => {
        if(res){
          Swal.fire({
            title: "Pago generado",
            text: 'El pago se ha generado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.ClearFields();
          this.matDialogRef.close(true);
        }
      },
      err => console.log(err)
    )
  }
}
