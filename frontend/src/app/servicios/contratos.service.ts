import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private URL = 'http://localhost:3000/api/contrato';

  constructor(private http:HttpClient) { }

  GetContratosActivos(){
    return this.http.get<Contrato[]>(this.URL + '/activos');
  }

  AgregarContrato(contrato: Contrato){
    return this.http.post<boolean>(this.URL + '/nuevo', contrato);
  }

  GetContrato(contrId: string){
    return this.http.get<Contrato>(this.URL + '/get/' + contrId);
  }
}
