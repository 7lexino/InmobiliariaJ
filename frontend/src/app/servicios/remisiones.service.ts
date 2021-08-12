import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Remision } from '../interfaces/remision';
import { Transaccion } from '../interfaces/transaccion';
import { TransaccionesService } from './transacciones.service';

@Injectable({
  providedIn: 'root'
})
export class RemisionesService {

  private URL = 'http://localhost:3000/api/remision';
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

  GetRemisiones(noContrato: number){
    return this.http.get<Remision[]>(this.URL + '/remisiones/' + noContrato);
  }

  CrearRemision(remision: Remision, noContrato: number){
    return this.http.post<Boolean>(this.URL + '/nueva', remision);
  }
}
