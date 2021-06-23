import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private router:Router) { }

  Registrar(usuario: Usuario){
    return this.http.post<any>(this.URL + '/register', usuario);
  }

  Loguear(usuario: Usuario){
    return this.http.post<any>(this.URL + '/login', usuario);
  }

  EstaLogueado(){
    return !!localStorage.getItem('token');
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
