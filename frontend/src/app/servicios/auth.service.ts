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

  VerificarToken(){
    const res = this.http.get<any>(this.URL + '/getActiveUser');

    res.subscribe(
      res => {
        this.usuarioActivo._id = res;

        const userObserver = this.http.get<Usuario>(this.URL + '/getusuario/' + this.usuarioActivo._id);
        userObserver.subscribe(
          res => {
            this.usuarioActivo.nombre = res.nombre;
            this.usuarioActivo.rango = res.rango;
            this.usuarioActivo.nick = res.nick;
            this.usuarioActivo.correo = res.correo;
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  Loguear(usuario: Usuario){
    const token = this.http.post<any>(this.URL + '/login', usuario);
    token.subscribe(
      res => {
        //this.VerificarToken();
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
