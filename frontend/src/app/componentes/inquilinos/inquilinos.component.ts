import { Component, OnInit } from '@angular/core';
import { Inquilino } from 'src/app/interfaces/inquilino';
import { InquilinosService } from 'src/app/servicios/inquilinos.service';
import { faEye, faMoneyBillAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { InquilinoDialogComponent } from '../dialogs/inquilino-dialog/inquilino-dialog.component';

@Component({
  selector: 'app-inquilinos',
  templateUrl: './inquilinos.component.html',
  styleUrls: ['./inquilinos.component.css']
})
export class InquilinosComponent implements OnInit {

  //Variables
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

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
  
  
  //Default Methods
constructor(private inquiService: InquilinosService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.GetTodos();
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

  GetTodos(){
    this.inquiService.GetInquilinos().subscribe(
      res => {
        this.inquilinos = res;
      },
      err => console.log(err)
    )
  }

  NuevoInquilino(){
    this.ClearFields();
    const dialogRef = this.matDialog.open(InquilinoDialogComponent, {
      data: {
        tituloVentana: "Nuevo Inquilino",
        inquilinoActivo: this.inquilinoActivo
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.GetTodos();
    })
  }

  VerInquilino(inquiId: string){
    this.inquiService.GetInquilino(inquiId).subscribe(
      res => {
        this.inquilinoActivo = res;
        const dialogRef = this.matDialog.open(InquilinoDialogComponent, {
          data: {
            tituloVentana: "Editar Inquilino",
            inquilinoActivo: this.inquilinoActivo
          },
          width: "500px"
        });
        dialogRef.afterClosed().subscribe(res => {
          this.GetTodos();
        })
      },
      err => console.log(err)
    )
  }

  EliminarInquilino(inquiId: string){
    if(confirm("¿Realmente desea eliminar el Inquilino?")){
      this.inquiService.BorrarInquilino(inquiId).subscribe(
        res => {
          if(res){
            alert("Se ha eliminado correctamente");
            this.GetTodos();
          }else{
            alert("Sucedió un error al intentar eliminar el inquilino.");
          }
        },
        err => console.log(err)
      )
    }
  }

}
