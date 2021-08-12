import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inquilino } from 'src/app/interfaces/inquilino';

@Component({
  selector: 'app-edo-cuenta-dialog',
  templateUrl: './edo-cuenta-dialog.component.html',
  styleUrls: ['./edo-cuenta-dialog.component.css']
})
export class EdoCuentaDialogComponent implements OnInit {

  //Variables

  //Default Methods
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    tituloVentana: string,
    inquilinoActivo: Inquilino
  }) {
    
  }

  ngOnInit(): void {
  }

  //Custom Methods
  

}