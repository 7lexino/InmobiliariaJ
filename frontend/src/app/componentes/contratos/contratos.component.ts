import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/interfaces/contrato';
import { ContratosService } from 'src/app/servicios/contratos.service';
import { faEye, faMoneyBillAlt, faTrashAlt, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ContratoDialogComponent } from '../dialogs/contrato-dialog/contrato-dialog.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { Subject } from 'rxjs';
import { jsPDF } from "jspdf";
import { TransaccionesService } from 'src/app/servicios/transacciones.service';

//Usar Angular Material para componente datepicker y otros componentes

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  
  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  faFileInvoiceDollar = faFileInvoiceDollar;
  faEye = faEye;
  faMoneyBillAlt = faMoneyBillAlt;
  faTrashAlt = faTrashAlt;

  contratos: Contrato[] = [];
  contratoActivo: Contrato = {
    _id: '',
    tipo: true,
    noContrato: 0,
    fechaInicio: '',
    fechaCierre: '',
    saldo: 0,
    aval: {
        nombre: '',
        correo: '',
        telefono1: '',
        telefono2: '',
    },
    costoInicial: 0,
    costoPeriodo: 0,
    propiedad: {
      _id: '',
      predial: '',
      direccion: {
          calle: '',
          no_ext: '',
          no_int: '',
          colonia: '',
          c_p: 0,
          ciudad: '',
          estado: ''
        }
    },
    inquilino: {
      _id: '',
      empresa: '',
      contacto: {
          nombre: '',
          apellidos: '',
          correo: '',
          telefono1: '',
          telefono2: '',
      }
    }
  };
  
  
  //Default Methods
constructor(public authService:AuthService, private contrService: ContratosService, private tranService: TransaccionesService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.VerificarToken();

    this.GetTodos();
    this.dtOptions = {
      retrieve: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']],
      language: {
        url: '../../../assets/lang/datatable_lang.json'
      }
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Custom Methods

  NuevoContrato(){
    this.ClearFields();
    const dialogRef = this.matDialog.open(ContratoDialogComponent, {
      data: {
        tituloVentana: "Nuevo Contrato",
        contratoActivo: this.contratoActivo
      },
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res) this.GetTodos();
    });
  }

  ClearFields(){
    this.contratoActivo._id = '';
    this.contratoActivo.tipo = true;
    this.contratoActivo.noContrato = 0; //Individuo o Empresa
    this.contratoActivo.fechaInicio = ''; //Nombre de la Compañía
    this.contratoActivo.fechaCierre = '';
    this.contratoActivo.aval.nombre = '';
    this.contratoActivo.aval.correo = '';
    this.contratoActivo.aval.telefono1 = '';
    this.contratoActivo.aval.telefono2 = '';
    this.contratoActivo.costoInicial = 0;
    this.contratoActivo.costoPeriodo = 0;
    this.contratoActivo.propiedad._id = '';
    this.contratoActivo.propiedad.predial = '';
    this.contratoActivo.propiedad.direccion.c_p = 0;
    this.contratoActivo.propiedad.direccion.calle = '';
    this.contratoActivo.propiedad.direccion.ciudad = '';
    this.contratoActivo.propiedad.direccion.colonia = '';
    this.contratoActivo.propiedad.direccion.estado = '';
    this.contratoActivo.propiedad.direccion.no_ext = '';
    this.contratoActivo.propiedad.direccion.no_int = '';
    this.contratoActivo.inquilino._id = '';
    this.contratoActivo.inquilino.empresa = '';
    this.contratoActivo.inquilino.contacto.nombre = '';
    this.contratoActivo.inquilino.contacto.apellidos = '';
    this.contratoActivo.inquilino.contacto.correo = '';
    this.contratoActivo.inquilino.contacto.telefono1 = '';
    this.contratoActivo.inquilino.contacto.telefono2 = '';
  }

  GetTodos(){
    $("#radTodos").prop('checked', true);
    this.contrService.GetContratos().subscribe(
      res => {
        this.contratos = res;
        this.dtTrigger.next();
      },
      err => console.log(err)
    )
    this.dtTrigger.next();
  }

  GetActivos(){
    $("#radActivos").prop('checked', true);
      if($.fn.dataTable.isDataTable('#dtContratos')){
        this.contrService.GetContratosActivos().subscribe(
          res => {
            this.contratos = res;
            this.dtTrigger.next();
          },
          err => console.log(err)
        )
    }
  }

  GetArchivados(){
    $("#radArchivados").prop('checked', true);
      if($.fn.dataTable.isDataTable('#dtContratos')){
        this.contrService.GetContratosArchivados().subscribe(
          res => {
            this.contratos = res;
            this.dtTrigger.next();
          },
          err => console.log(err)
        )
    }
  }

  VerContrato(contrId: string){
    this.contrService.GetContrato(contrId).subscribe(
      res => {
        this.contratoActivo = res;
        this.matDialog.open(ContratoDialogComponent, {
          data: {
            tituloVentana: "Detalles",
            contratoActivo: this.contratoActivo
          },
          width: "700px"
        });
        
      },
      err => console.log(err)
    )
  }

  GenerarPDF(){
    const doc = new jsPDF();

    doc.text("Hola mundo en PDF", 10, 10);
    doc.save("a4.pdf"); //Genera y descarga el PDF
  }

}
