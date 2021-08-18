import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from '../../servicios/auth.service';
import { ClaveRegistroDialogComponent } from '../dialogs/clave-registro-dialog/clave-registro-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //Variables
  usuario: Usuario = {
    _id: '',
    nombre: '',
    nick: '',
    correo: '',
    contra: '',
    rango: 0
  }

  //Default methods

  constructor(private authService: AuthService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  //Custom methods

  MostrarError(mensaje: string){
    $("#error_messages").text(mensaje);
    $("#error_messages").hide();
    $("#error_messages").show("slow");
  }

  ValidarCorreo(correo: any){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(correo);0
  }

  ValidarFormulario(){
    const nombre = $("#txtNombre").val();
    const usuario = $("#txtUsuario").val();
    const correo = $("#txtCorreo").val();
    const contra = $("#txtContra").val();
    const rango = $("#selRango").val();

    if(nombre == ""){
      this.MostrarError("El campo nombre se encuentra vacío");
      return false;
    }

    if(usuario == ""){
      this.MostrarError("El campo usuario se encuentra vacío");
      return false;
    }

    if(correo == ""){
      this.MostrarError("El campo correo se encuentra vacío");
      return false;
    }

    //Validamos que el correo sea un formato correcto (correo@dominio.com)
    if(!this.ValidarCorreo(correo)){
      this.MostrarError("El correo es incorrecto");
      return false;
    }

    if(contra == ""){
      this.MostrarError("El campo contraseña se encuentra vacío");
      return false;
    }

    if(rango == 0){
      this.MostrarError("Selecciona una opción para el nivel de usuario");
      return false;
    }

    return true;
  }

  ValidarUsuario(){
    if(!this.ValidarFormulario()){
      return; //Detenemos la ejecución
    }

    this.authService.ExisteUsuario(this.usuario.nick).subscribe(
      res => {
        if(!res){
          const dialogRef = this.matDialog.open(ClaveRegistroDialogComponent, {
            data: {
              tituloVentana: "Clave de seguridad",
              infoUsuario: this.usuario
            },
            width: "400px"
          });
          dialogRef.afterClosed().subscribe(resModal => {
            if(resModal == true){
              this.Registrar();
            }else{
              alert("La clave de seguridad es incorrecta");
            }
          });
        }else{
          this.MostrarError("El usuario ya se encuentra ocupado");
        }
      },
      err => console.log(err)
    );
    
  }

  Registrar(){
    this.authService.Registrar(this.usuario)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/escritorio']);
        },
        err => console.log(err)
      )
  }

}
