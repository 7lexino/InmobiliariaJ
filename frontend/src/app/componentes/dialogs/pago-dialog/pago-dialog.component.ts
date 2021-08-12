import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pago } from 'src/app/interfaces/pago';
import { AuthService } from 'src/app/servicios/auth.service';
import { PagosService } from 'src/app/servicios/pagos.service';

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

  //Custmo methods

  ClearFields(){
    this.pagoActivo._id = '';
    this.pagoActivo.fecha = '';
    this.pagoActivo.metodoPago = '';
    this.pagoActivo.monto = 0;
  }

  CrearPago(){
    this.pagoService.CrearPago(this.pagoActivo, this.data.noContrato).subscribe(
      res => {
        alert("Pago generado");
        this.ClearFields();
        this.matDialogRef.close();
      },
      err => console.log(err)
    )
  }
}
