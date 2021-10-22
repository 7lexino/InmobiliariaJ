import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Workbook } from 'exceljs';
//import * as fs from 'file-saver';
// import * as Excel from 'exceljs'
// import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class ExportarExcelService {
  
  private URL = 'http://192.168.2.15:3000/api/excel';

  constructor(private http: HttpClient) { }

  ExportToExcel_EdoCuentaEmpresa(f_inicial: String, f_final: String){
    return this.http.get<any>(this.URL + '/exportar_edo_cuenta_empresarial/' + f_inicial + '/' + f_final);
  }
}
