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
    adjuntoId: 0,
    noContrato: 0,
    createdAt: ''
  }

  constructor(private http: HttpClient, private tranService: TransaccionesService) { }

  GetRemisiones(noContrato: number){
    return this.http.get<Remision[]>(this.URL + '/remisiones/' + noContrato);
  }

  CrearRemision(remision: Remision, noContrato: number){
    //Creamos la remisión
    const res = this.http.post<boolean>(this.URL + '/nueva', remision);

    //Ahora generamos una transacción tipo cargo
    this.transaccion.tipo = 'cargo';
    this.transaccion.concepto = remision.id + '. ' + remision.concepto
    this.transaccion.monto = remision.total;
    this.transaccion.adjuntoId = remision.id;
    this.transaccion.noContrato = noContrato;
    
    this.tranService.UltimaTransaccionPorContrato(noContrato).subscribe(
      res => {
        console.log(this.transaccion);
        if(res){
          this.transaccion.saldo = res.saldo + remision.total;
        }else{
          this.transaccion.saldo = this.transaccion.monto;
        }


        this.tranService.GenerarTransaccion(this.transaccion).subscribe(
          res => {
            console.log("La transacción se generó correctamente.");
          },
          err => {
            console.log(err)
            alert("No se ha podido generar la transacción. Puede visualizar el error en la consola.");
          }
        )

      },
      err => this.transaccion.saldo = remision.total
    )

    return res;
  }
}
