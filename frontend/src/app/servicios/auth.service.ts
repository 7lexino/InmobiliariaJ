import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { Rangos } from '../enums/rangos-usuarios.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  eRangos = Rangos;
  private URL = 'http://localhost:3000/api/user';
  private usuarioActivo: Usuario = {
    _id: '',
    nombre: '',
    nick: '',
    correo: '',
    contra: '',
    rango: 0
  }

  constructor(private http: HttpClient, private router:Router) { }
  
  //Custom methods
  ClearUsuario(){
    this.usuarioActivo._id = '';
    this.usuarioActivo.nombre = '';
    this.usuarioActivo.nick = '';
    this.usuarioActivo.correo = '';
    this.usuarioActivo.contra = '';
    this.usuarioActivo.rango = 0;
  }

  Registrar(usuario: Usuario){
    return this.http.post<any>(this.URL + '/register', usuario);
  }

  Loguear(usuario: Usuario){
    const token = this.http.post<any>(this.URL + '/login', usuario);
    token.subscribe(
      res => {
        const user = this.http.get<Usuario>(this.URL + '/usuario/' + usuario.nick);
        user.subscribe(
          res => {
            this.usuarioActivo = res;
    
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
    return token;
  }

  EstaLogueado(){
    return !!localStorage.getItem('token');
  }

  GetUsuario(){
    return this.usuarioActivo;
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
