import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../interfaces/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  private URL = 'http://localhost:3000/api/mantenimiento';

  constructor(private http:HttpClient) { }

  CrearMantenimiento(mantenimiento: Mantenimiento){
    return this.http.post<boolean>(this.URL + '/nuevo', mantenimiento);
  }

  GetTodosByProp(propId: string){
    return this.http.get<Mantenimiento[]>(this.URL + '/mantenimientos/' + propId);
  }

  GetMantenimiento(mttoId: string){
    return this.http.get<Mantenimiento>(this.URL + '/get/' + mttoId);
  }

  UpdateMantenimiento(mantenimiento: Mantenimiento){
    return this.http.put(this.URL + '/update', mantenimiento);
  }

  DeleteMantenimiento(mttoId: string){
    return this.http.delete(this.URL + '/delete/' + mttoId);
  }
}