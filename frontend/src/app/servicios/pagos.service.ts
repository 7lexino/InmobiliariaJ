import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge } from 'jquery';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Pago } from '../interfaces/pago';
import { Transaccion } from '../interfaces/transaccion';
import { TransaccionesService } from './transacciones.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private URL = 'http://192.168.2.15:3000/api/pago';
  transaccion: Transaccion = {
    _id: '',
    fecha: '',
    tipo: '',
    concepto: '',
    monto: 0,
    saldo: 0,
    adjuntoId: '',
    noContrato: 0,
    createdAt: ''
  }

  constructor(private http: HttpClient, private tranService: TransaccionesService) { }

  CrearPago(pago: Pago, noContrato: number, datos: string = ""){
    //Generamos el pago
    const resultado = this.http.post<boolean>(this.URL + '/nuevo', pago);
    const dFecha = new Date(pago.fecha); //Parseamos el string a Date
    //var ultimaTrans: Transaccion;

    //Ahora generamos una transacción para el contrato del inquilino
    this.transaccion.fecha = dFecha.toISOString();
    this.transaccion.tipo = noContrato == 0 ? 'egreso' : 'abono';
    this.transaccion.concepto = noContrato == 0 ? datos : pago.metodoPago + " realizada para contrato " + noContrato;
    this.transaccion.monto = pago.monto;
    this.transaccion.adjuntoId = pago.metodoPago == "Transferencia" ? "transferencia" : "";
    this.transaccion.noContrato = noContrato;

      // this.tranService.UltimaTransaccionPorContrato(noContrato).get()
      //   .flatMap((ult_trans: Transaccion) => {
      //     if(ult_trans){
      //       console.log("Encontró una ultima transaccion");
      //       this.transaccion.saldo = ult_trans.saldo - pago.monto;
      //     }
      //     this.tranService.GenerarTransaccion(this.transaccion)
      //   })
      //   .flatMap((res: boolean) => {
      //     if(this.transaccion.noContrato != 0){ //Para no duplicar cuando se hace un egreso
      //       //Ahora generamos una transacción para la cuenta de la EMPRESA como un ingreso
      //         this.transaccion.noContrato = 0;
      //         this.tranService.GenerarTransaccion(this.transaccion)
      //     }
      //   }).subscribe((res_general: any) => {
      //     console.log(res_general);
      //       return resultado;
      //   });
      
 
      
          
    //this.transaccion.saldo = res1.saldo - pago.monto;
    this.tranService.GenerarTransaccion(this.transaccion).subscribe(
      res2 => {
        if(this.transaccion.noContrato != 0){ //Para no duplicar cuando se hace un egreso
          //Ahora generamos una transacción para la cuenta de la EMPRESA como un ingreso
            this.transaccion.noContrato = 0;
            this.tranService.GenerarTransaccion(this.transaccion).subscribe(
              res3 => { },
              err3 => {
                console.log(err3);
                alert("No se ha podido generar la transacción. Puede visualizar el error en la consola.");
              }
            )
        }
      },
      err2 => {
        console.log(err2)
        alert("No se ha podido generar la transacción. Puede visualizar el error en la consola.");
      }
    )
  
          
  
  
    return resultado;
  }
}
