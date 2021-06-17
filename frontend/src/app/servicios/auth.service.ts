import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router:Router) { }

  Registrar(usuario: any){
    return this.http.post<any>(this.URL + '/register', usuario);
  }

  Loguear(usuario: any){
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
