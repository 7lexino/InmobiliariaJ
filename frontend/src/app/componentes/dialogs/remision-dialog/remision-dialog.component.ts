import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Remision } from 'src/app/interfaces/remision';
import { AuthService } from 'src/app/servicios/auth.service';
import { RemisionesService } from 'src/app/servicios/remisiones.service';

@Component({
  selector: 'app-remision-dialog',
  templateUrl: './remision-dialog.component.html',
  styleUrls: ['./remision-dialog.component.css']
})
export class RemisionDialogComponent implements OnInit {

  //Variables
  remisionActiva: Remision = {
    _id: '',
    id: 0,
    factura: '',
    concepto: '',
    total: 0,
    noContrato: 0
  }
  tipoContrato: boolean = true;

  //Default methods

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    tituloVentana: string,
    noContrato: number,
    tipoContrato: boolean,
    total: number
  }, private matDialogRef: MatDialogRef<RemisionDialogComponent>, private remiService: RemisionesService, public authService: AuthService) { 
    this.remisionActiva.noContrato = data.noContrato;
    this.remisionActiva.total = data.total;
    this.tipoContrato = data.tipoContrato;
  }

  ngOnInit(): void {
    const mesActual = new Date().getMonth()+1;
    const anioActual = new Date().getFullYear();
    const lastDay = new Date(anioActual, mesActual, 0).getDate();
    this.remisionActiva.concepto = "Periodo del 1/" + mesActual + '/' + anioActual + ' al ' + lastDay + '/' + mesActual + '/' + anioActual;
    
  }

  //Custom methods

  ClearFields(){
    this.remisionActiva._id = '';
    this.remisionActiva.id = 0;
    this.remisionActiva.concepto = '';
    this.remisionActiva.total = 0;
    this.remisionActiva.noContrato = this.data.noContrato;
  }

  CrearRemision(){
    this.remiService.CrearRemision(this.remisionActiva, this.data.noContrato).subscribe(
      res => {
        alert("Remisión creada");
        this.ClearFields();
        this.matDialogRef.close();
      },
      err => console.log(err)
    )
  }

}
