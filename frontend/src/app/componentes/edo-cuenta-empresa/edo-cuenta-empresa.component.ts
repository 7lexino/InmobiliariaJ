import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Transaccion } from 'src/app/interfaces/transaccion';
import { AuthService } from 'src/app/servicios/auth.service';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { EgresoDialogComponent } from '../dialogs/egreso-dialog/egreso-dialog.component';

@Component({
  selector: 'app-edo-cuenta-empresa',
  templateUrl: './edo-cuenta-empresa.component.html',
  styleUrls: ['./edo-cuenta-empresa.component.css']
})
export class EdoCuentaEmpresaComponent implements OnInit {

  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  faPrint = faPrint;

  transacciones: Transaccion[] = [];
  transaccionActiva: Transaccion = {
    _id: '',
    fecha: '',
    tipo: '',
    concepto: '',
    monto: 0,
    saldo: 0,
    adjuntoId: '',
    noContrato: 0,
    createdAt: ''
  }


  //Default methods
  constructor(public authService: AuthService,
    public tranService: TransaccionesService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.VerificarToken();
    
    this.CargarTabla();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      language: {
        url: '../../../assets/lang/datatable_lang.json'
      },
      dom: 'Bfrtip',
      //buttons: ['excel']
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Custom methods

  CargarTabla(){
    if($.fn.dataTable.isDataTable('#dtEdoCuentaE')){
      var table = $("#dtEdoCuentaE").DataTable(this.dtOptions);
      table.destroy();
    }
    this.tranService.GetTransaccionesEmpresa().subscribe(
      res => {   
        this.transacciones = res;
        var saldoAnt = 0;
        this.transacciones.forEach(e => {
          if(e.concepto == "transaccion_inicial"){
            e.saldo = e.monto;
            saldoAnt = e.saldo;
          }else{
            if(e.tipo == "abono") e.saldo = saldoAnt + e.monto;
            else if(e.tipo == "egreso") e.saldo = saldoAnt - e.monto;
            
            saldoAnt = e.saldo;
          }
        });

        this.dtTrigger.next();
      },
      err => console.log(err)
    );
  }

  NuevoEgreso(){
    const ref = this.matDialog.open(EgresoDialogComponent, {
      data: {
        tituloVentana: "Nuevo egreso"
      },
      width: "600px"
    });
    ref.afterClosed().subscribe(res => {
      if(res) this.CargarTabla();
    });
  }

  SetSaldoInicial(){
    var saldo_inicial = window.prompt("Ingrese el monto inicial");
    var _saldo = 0.0;
    
    
    if(saldo_inicial == "" || saldo_inicial == null){
      alert("Ingrese un monto");
      return;
    }
    
    if(!$.isNumeric(saldo_inicial)){
      alert("Ingrese un valor válido");
      return;
    }
    
    _saldo = parseFloat(saldo_inicial);

    this.transaccionActiva.fecha = new Date(1999,7,26,12,0,0).toISOString();
    this.transaccionActiva.concepto = "transaccion_inicial";
    this.transaccionActiva.tipo = "abono";
    this.transaccionActiva.monto = _saldo;
    this.transaccionActiva.saldo = 0;
    this.transaccionActiva.noContrato = 0;


    this.tranService.GenerarTransaccion(this.transaccionActiva).subscribe(res => {
      if(res){
        this.CargarTabla();
        alert("Saldo inicial registrado");
      }else{
        alert("Hubo un error");
      }
    },
    err => console.log(err));
  }

}
