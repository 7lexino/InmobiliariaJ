import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from '../../servicios/auth.service';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Registrar(){
    this.authService.Registrar(this.usuario)
      .subscribe(
        res => {
          // console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/escritorio']);
        },
        err => console.log(err)
      )
  }

}
