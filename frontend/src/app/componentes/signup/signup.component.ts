import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usuario = {
    nombre: '',
    nick: '',
    correo: '',
    contra: ''
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
