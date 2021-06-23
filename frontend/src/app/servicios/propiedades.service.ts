import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Propiedad } from '../interfaces/propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  private URL = 'http://localhost:3000/api/propiedad';

  constructor(private http:HttpClient) { }

  GetPropiedadesDisponibles(){
    return this.http.get<Propiedad[]>(this.URL + '/disponibles');
  }

  GetPropiedadesRentadas(){
    return this.http.get<Propiedad[]>(this.URL + '/rentadas');
  }

  AgregarPropiedad(propiedad: Propiedad){
    return this.http.post<boolean>(this.URL + '/nueva', propiedad);
  }

  GetPropiedad(propId: string){
    return this.http.get<Propiedad>(this.URL + '/get/' + propId);
  }

  BorrarPropiedad(propId: string){
    return this.http.delete<boolean>(this.URL + '/delete/' + propId);
  }

  ActualizarPropiedad(propiedad: Propiedad){
    return this.http.put<boolean>(this.URL + '/actualizar', propiedad);
  }
}
