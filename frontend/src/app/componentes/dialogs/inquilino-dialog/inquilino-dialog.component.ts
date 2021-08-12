import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inquilino } from 'src/app/interfaces/inquilino';
import { AuthService } from 'src/app/servicios/auth.service';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';

@Component({
  selector: 'app-inquilino-dialog',
  templateUrl: './inquilino-dialog.component.html',
  styleUrls: ['./inquilino-dialog.component.css']
})
export class InquilinoDialogComponent implements OnInit {

  //Variables
  inquilinos: Inquilino[] = [];
  inquilinoActivo: Inquilino = {
    _id: '',
    tipo: true, //Individuo o Empresa
    empresa: '', //Nombre de la Compañía
    contacto: { //Información personal del contacto
        nombre: '',
        apellidos: '',
        correo: '',
        telefono1: '',
        telefono2: '',
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    tituloVentana: string,
    inquilinoActivo: Inquilino
  }, private matDialogRef: MatDialogRef<InquilinoDialogComponent>,
    private inquiService: InquilinosService,
    public authService:AuthService) {
      //
      this.inquilinoActivo = data.inquilinoActivo;
    }

  ngOnInit(): void {
  }

  //Custom Methods

  ClearFields(){
    this.inquilinoActivo._id = '';
    this.inquilinoActivo.tipo = true; //Individuo o Empresa
    this.inquilinoActivo.empresa = ''; //Nombre de la Compañía
    this.inquilinoActivo.contacto.nombre = '';
    this.inquilinoActivo.contacto.apellidos = '';
    this.inquilinoActivo.contacto.correo = '';
    this.inquilinoActivo.contacto.telefono1 = '';
    this.inquilinoActivo.contacto.telefono2 = ''; 
  }

  GuardarInquilino(inquilino: Inquilino){
    if(inquilino._id == ''){ 
      this.CrearInquilino();
    }else{
      this.ModificarInquilino(inquilino);
    }
  }

  CrearInquilino(){
    this.inquiService.AgregarInquilino(this.inquilinoActivo).subscribe(
      res => {
        if(res){
          alert("Inquilino creado");
          this.ClearFields();
          this.matDialogRef.close();
        }
        else
          alert("Error al crear inquilino");
      },
      err => console.log(err)
    )
  }

  ModificarInquilino(inquilino: Inquilino){
    this.inquiService.ActualizarInquilino(inquilino).subscribe(
      res => {
        console.log(res);
        if(res){
          alert("Inquilino modificado");
          this.ClearFields();
          this.matDialogRef.close();
        }
        else
          alert("Error al modificar el inquilino");
      },
      err => console.log(err)
    )
  }

}
