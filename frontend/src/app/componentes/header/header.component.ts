import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { faSignOutAlt, faHome, faUsers, faFileContract, faStream, faFileInvoiceDollar, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Variables
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  faUsers = faUsers;
  faFileContract = faFileContract;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faStream = faStream;
  faPiggyBank = faPiggyBank;

  //Default methods

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  //Custom methods

}
