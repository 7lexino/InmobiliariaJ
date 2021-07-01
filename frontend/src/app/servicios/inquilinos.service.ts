import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inquilino } from '../interfaces/inquilino';

@Injectable({
  providedIn: 'root'
})
export class InquilinosService {

  private URL = 'http://localhost:3000/api/inquilino';

  constructor(private http:HttpClient) { }

  GetInquilinos(){
    return this.http.get<Inquilino[]>(this.URL + '/todos');
  }

  AgregarInquilino(inquilino: Inquilino){
    return this.http.post<boolean>(this.URL + '/nuevo', inquilino);
  }

  GetInquilino(inquiId: string){
    return this.http.get<Inquilino>(this.URL + '/get/' + inquiId);
  }

  BorrarInquilino(inquiId: string){
    return this.http.delete<boolean>(this.URL + '/delete/' + inquiId);
  }

  ActualizarInquilino(inquilino: Inquilino){
    return this.http.put<boolean>(this.URL + '/actualizar', inquilino);
  }
}
