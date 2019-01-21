import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { DatosService } from '../../_servicios/datos.service';
import { MenuService } from '../../_servicios/menu.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public nom;
  public pwd;
  constructor(public  ds: DatosService, private router: Router , private ms: MenuService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.ds.userAuthentication(form.value.nombre, form.value.password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.username);
      localStorage.setItem('userUsuarioId', data.usuarioId);
      // this.ms.getMenu();
      this.router.navigate( ['/home'] );
    },
      error =>  alert(error)
    );
  }

}
