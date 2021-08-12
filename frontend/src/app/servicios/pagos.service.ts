import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from '../interfaces/pago';
import { Transaccion } from '../interfaces/transaccion';
import { TransaccionesService } from './transacciones.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private URL = 'http://localhost:3000/api/pago';
  transaccion: Transaccion = {
    _id: '',
    tipo: '',
    concepto: '',
    monto: 0,
    saldo: 0,
    adjuntoId: '',
    noContrato: 0,
    createdAt: ''
  }

  constructor(private http: HttpClient, private tranService: TransaccionesService) { }

  CrearPago(pago: Pago, noContrato: number){
    //Creamos la remisión
    const res = this.http.post<boolean>(this.URL + '/nuevo', pago);
    const dFecha = new Date(pago.fecha); //Parseamos el string a Date

    //Ahora generamos una transacción tipo cargo
    this.transaccion.tipo = 'abono';
    this.transaccion.concepto = pago.metodoPago + ' el ' + dFecha.toLocaleDateString("es-MX");
    this.transaccion.monto = pago.monto;
    this.transaccion.adjuntoId = '';
    this.transaccion.noContrato = noContrato;
    
    this.tranService.UltimaTransaccionPorContrato(noContrato).subscribe(
      res => {
        console.log(this.transaccion);
        if(res){
          this.transaccion.saldo = res.saldo - pago.monto;
        }else{
          this.transaccion.saldo = this.transaccion.monto;
        }


        this.tranService.GenerarTransaccion(this.transaccion).subscribe(
          res => {},
          err => {
            console.log(err)
            alert("No se ha podido generar la transacción. Puede visualizar el error en la consola.");
          }
        )

      },
      err => this.transaccion.saldo = pago.monto
    )

    return res;
  }
}
