import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usuario: Usuario = {
    _id: '',
    nombre: '',
    nick: '',
    correo: '',
    contra: '',
    rango: 0
  } 

  //Default methods

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  //Custom methods

  MostrarError(mensaje: string){
    $("#error_messages").text(mensaje);
    $("#error_messages").hide();
    $("#error_messages").show("slow");
  }

  ValidarFormulario(){
    const usuario = $("#txtUsuario").val();
    const contra = $("#txtContra").val();

    if(usuario == ""){
      this.MostrarError("El campo usuario se encuentra vacío");
      return false;
    }

    if(contra == ""){
      this.MostrarError("El campo contraseña se encuentra vacío");
      return false;
    }

    return true;
  }
  
  IniciarSesion(){
    if(!this.ValidarFormulario()){
      return; //Detenemos la ejecución
    }

    this.authService.Loguear(this.usuario).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/escritorio']);
      },
      err => {
        if(err.error == "wrong_user"){
          this.MostrarError("El usuario no existe");
          return;
        }

        if(err.error == "wrong_password"){
          this.MostrarError("Contraseña incorrecta");
          return;
        }
      }
    )  
  }
}
