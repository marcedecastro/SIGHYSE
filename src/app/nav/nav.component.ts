import { Component, OnInit } from '@angular/core';
import {MenuService} from '../_servicios/menu.service';
import {DatosService} from '../_servicios/datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    public navbarOpen = false;


  // tslint:disable-next-line:max-line-length
  constructor(  public menuService: MenuService, public ds: DatosService, private  router: Router, private mensajesService: ToastrService) { }

  ngOnInit() {
    this.ds.getConfig().subscribe(
      url => { localStorage.setItem('apiUrl' , url.ApiUrl); localStorage.setItem('seguridadIntegrada' , url.seguridadIntegrada);
      this.menuService.segInt = !!localStorage.getItem('seguridadIntegrada');
      this.ds.userAuthentication('', '').subscribe((data: any) => {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.username);
        localStorage.setItem('userUsuarioId', data.usuarioId);
        this.ds.inicializar();
        this.menuService.getEdificios();
        this.menuService.getMenu();
      },
      error => { this.mensajesService.error(error.message); });
    } );
    this.router.navigate( ['/home'] );

  }

    getMenu() {
      this.menuService.getMenu();

    }

    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }

    cambiarEdificio(edificioId) {
      localStorage.setItem('edificioId', edificioId);
      this.menuService.getMenu();
      this.ds.edificioId = edificioId;
      this.menuService.setMenu(this.menuService.menuActual());
      this.router.navigate( ['/home'] );
    }
}
