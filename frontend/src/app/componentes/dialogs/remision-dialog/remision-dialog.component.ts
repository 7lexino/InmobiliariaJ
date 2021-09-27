import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Remision } from 'src/app/interfaces/remision';
import { AuthService } from 'src/app/servicios/auth.service';
import { RemisionesService } from 'src/app/servicios/remisiones.service';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";

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

  MostrarError(mensaje: string){
    $("#error_remision").text(mensaje);
    $("#error_remision").hide();
    $("#error_remision").show("slow", function(){
      setTimeout(function(){
        $("#error_remision").hide("slow");
      }, 1800)
    });
  }

  ClearFields(){
    this.remisionActiva._id = '';
    this.remisionActiva.id = 0;
    this.remisionActiva.concepto = '';
    this.remisionActiva.total = 0;
    this.remisionActiva.noContrato = this.data.noContrato;
  }

  ValidarFormulario(){
    const docFactura = $("#txtFactura").val();
    const concepto = $("#txtConcepto").val();
    const monto = $("#nTotal").val();

    if(this.tipoContrato == true){
      if(docFactura == ""){
        this.MostrarError("El campo no. factura se encuentra vacío");
        return false;
      }
    }

    if(concepto == ""){
      this.MostrarError("El campo concepto se encuentra vacío");
      return false;
    }

    if(monto == ""){
      this.MostrarError("El campo monto total se encuentra vacío");
      return false;
    }

    return true;
  }

  CrearRemision(){
    //Validamos
    if(!this.ValidarFormulario()){
      return; //Detenemos ejecución
    }

    this.remiService.CrearRemision(this.remisionActiva).subscribe(
      res => {
        Swal.fire({
          title: "Remisión generada",
          text: 'La remisión se ha generado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ClearFields();
        this.matDialogRef.close(true);
      },
      err => console.log(err)
    );
  }

}
