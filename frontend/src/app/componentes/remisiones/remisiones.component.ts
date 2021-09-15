import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Remision } from 'src/app/interfaces/remision';
import { AuthService } from 'src/app/servicios/auth.service';
import { RemisionesService } from 'src/app/servicios/remisiones.service';
import { RemisionDialogComponent } from '../dialogs/remision-dialog/remision-dialog.component';

@Component({
  selector: 'app-remisiones',
  templateUrl: './remisiones.component.html',
  styleUrls: ['./remisiones.component.css']
})
export class RemisionesComponent implements OnInit {

  //Variables
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  remisiones: Remision[] = [];
  noContrato: number = 0;
  remisionNueva: boolean = false;

  //Default methods

  constructor(public authService: AuthService,
    private route: ActivatedRoute, 
    private remiService: RemisionesService, 
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

    if(this.remisionNueva === true){
      this.NuevaRemision();
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Custom methods

  GetParametros(){
    this.noContrato = Number(this.route.snapshot.paramMap.get('noContrato'));
    this.remisionNueva = Boolean(this.route.snapshot.paramMap.get('remisionNueva'));
  }

  CargarTabla(){
    if($.fn.dataTable.isDataTable('#dtRemisiones')){
      var table = $("#dtRemisiones").DataTable(this.dtOptions);
      table.destroy();
    }
    this.remiService.GetRemisiones(this.noContrato).subscribe(
      res => {
        this.remisiones = res;
        this.dtTrigger.next();
      },
      err => console.log(err)
    );
  }

  NuevaRemision(){
    const ref = this.matDialog.open(RemisionDialogComponent, {
      data: {
        tituloVentana: "Nueva remisión",
        noContrato: this.noContrato
      },
      width: "600px"
    });
    ref.afterClosed().subscribe(res => {
      this.CargarTabla();
    });
  }

}
