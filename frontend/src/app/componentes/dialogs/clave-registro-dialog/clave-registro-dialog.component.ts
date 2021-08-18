import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-clave-registro-dialog',
  templateUrl: './clave-registro-dialog.component.html',
  styleUrls: ['./clave-registro-dialog.component.css']
})
export class ClaveRegistroDialogComponent implements OnInit {

  //Default methods

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    tituloVentana: string,
    infoUsuario: Usuario
  }, private matDialogRef: MatDialogRef<ClaveRegistroDialogComponent>) { }

  ngOnInit(): void {
  }

  //Custom methods

  VerificarClave(){
    const clave = $("#txtClave").val();

    if(clave === "#JU_s4_d_cV2021#")
      this.matDialogRef.close(true);
    else{
      $("#error_messages_dialog").text("La clave de seguridad es incorrecta");
      $("#error_messages_dialog").hide();
      $("#error_messages_dialog").show("slow");
    }
    
  }

}
