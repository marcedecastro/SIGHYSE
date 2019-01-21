import { Component, OnInit } from '@angular/core';
import {DatosService} from './../_servicios/datos.service';
import {MenuService} from './../_servicios/menu.service';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

    public segInt: Boolean;

  constructor(private ds: DatosService, private router: Router, private ms: MenuService ) { }

  ngOnInit() {
    this.segInt = (localStorage.getItem('seguridadIntegrada') === 'true');
  }


  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userUsuarioId');
    this.ms.clearMenu();
    this.router.navigate(['/home']);
  }

  
}
