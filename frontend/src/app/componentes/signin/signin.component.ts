import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  usuario = {
    nombre: "",
    nick: "",
    correo: "",
    contra: ""
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  IniciarSesion(){
    this.authService.Loguear(this.usuario).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/escritorio']);
      },
      err => {
        if(err.error == "wrong_user"){
          $("#error_messages").text("El usuario no existe");          
          $("#error_messages").show();
          return;
        }

        if(err.error == "wrong_password"){
          $("#error_messages").text("Contraseña incorrecta");          
          $("#error_messages").show();
          return;
        }
      }
    )  
  }
}
