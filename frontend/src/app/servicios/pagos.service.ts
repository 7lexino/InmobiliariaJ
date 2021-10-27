import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge } from 'jquery';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Configuracion } from '../enums/config.enum';
import { Pago } from '../interfaces/pago';
import { Transaccion } from '../interfaces/transaccion';
import { TransaccionesService } from './transacciones.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  eConfig = Configuracion;
  private URL = this.eConfig.url_db + "/api/pago";
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
    
    const param = {
      fecha: pago.fecha,
      metodoPago: pago.metodoPago,
      monto: pago.monto,
      noContrato: noContrato,
      datos: datos
    }

    //Generamos el pago
    return this.http.post<boolean>(this.URL + '/nuevo', param);
  }
}
