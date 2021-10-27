import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuracion } from '../enums/config.enum';
import { Contrato } from '../interfaces/contrato';
import { TransaccionesService } from './transacciones.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  eConfig = Configuracion;
  private URL = this.eConfig.url_db + "/api/contrato";

  constructor(private http:HttpClient, private tranService: TransaccionesService) { }

  GetContratos() {
    return this.http.get<Contrato[]>(this.URL + '/todos');
  }

  GetContratosActivos(){
    return this.http.get<Contrato[]>(this.URL + '/activos');
  }

  GetContratosPorVencer(){
    return this.http.get<Contrato[]>(this.URL + '/vencer');
  }

  GetContratosArchivados(){
    return this.http.get<Contrato[]>(this.URL + '/archivados');
  }

  AgregarContrato(contrato: Contrato){
    return this.http.post<boolean>(this.URL + '/nuevo', contrato);  
  }

  GetContrato(contrId: string){
    return this.http.get<Contrato>(this.URL + '/get/' + contrId);
  }
}
