import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Transaccion } from 'src/app/interfaces/transaccion';
import { AuthService } from 'src/app/servicios/auth.service';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { MatDialog } from '@angular/material/dialog';
import { RemisionDialogComponent } from '../dialogs/remision-dialog/remision-dialog.component';
import { PagoDialogComponent } from '../dialogs/pago-dialog/pago-dialog.component';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {

  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  faPrint = faPrint;

  transacciones: Transaccion[] = [];
  transaccionActiva: Transaccion = {
    _id: '',
    tipo: '',
    concepto: '',
    monto: 0,
    saldo: 0,
    adjuntoId: 0,
    noContrato: 0,
    createdAt: ''
  };
  noContrato: number = 0;
  tipoContrato: boolean = true;
  total: number = 0;


  //Default methods

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private tranService: TransaccionesService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    //Opciones de la DataTable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '../../../assets/lang/datatable_lang.json'
      }
    };

    //Recopilamos la información de los parametros
    this.GetParametros();

    //Cargamos la tabla
    this.CargarTabla();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  
  //Custom methods

  GetParametros(){
    this.noContrato = Number(this.route.snapshot.paramMap.get('noContrato'));
    this.tipoContrato = this.route.snapshot.paramMap.get('tipoContrato') === "true" ? true : false;
    this.total = Number(this.route.snapshot.paramMap.get('total'));
  }

  CargarTabla(){
    if($.fn.dataTable.isDataTable('#dtRemisiones')){
      var table = $("#dtRemisiones").DataTable();
      table.destroy();
    }
    this.tranService.GetTransaccionesByContrato(this.noContrato).subscribe(
      res => {
        this.transacciones = res;
        this.dtTrigger.next();
      },
      err => console.log(err)
    )
  }

  NuevaRemision(){
    const ref = this.matDialog.open(RemisionDialogComponent, {
      data: {
        tituloVentana: "Nueva remisión",
        noContrato: this.noContrato,
        tipoContrato: this.tipoContrato,
        total: this.total
      },
      width: "600px"
    });
    ref.afterClosed().subscribe(res => {
      this.CargarTabla();
    });
  }

  NuevoPago(){
    const ref = this.matDialog.open(PagoDialogComponent, {
      data: {
        tituloVentana: "Nuevo pago",
        noContrato: this.noContrato
      },
      width: "600px"
    });
    ref.afterClosed().subscribe(res => {
      this.CargarTabla();
    });
  }

}
