import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../_Modelos/menu';
import { Edificio } from '../_Modelos/Edificio';


import { DatosService } from './datos.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu;
  public submenu: Menu[];
  public  edificios: Edificio[];
  public segInt;
  public sidebar: boolean;

  constructor( private datosService: DatosService, private mensajesService: ToastrService) {

    this.edificios = [];
    this.menu = [];
    this.sidebar = true;

  }

  getMenu() {
    this.datosService.getMenu()
      .subscribe(res => { this.menu =  JSON.parse(res).Datos; },
        error => { this.mensajesService.error(error); });
  }

  menuActual(): Menu { return this.menu; }
  getSubMenu(): Menu[] { return this.submenu; }

  setMenu(menu: Menu) {
    this.submenu = menu.Hijos;
    this.sidebar = true;
  }

    clearMenu() {
      this.menu = [];
      this.submenu = [];
    }

    getEdificios() {
      this.datosService.getDatos('EdificiosAmbito')
      .subscribe(res => {
        if (JSON.parse(res).Status[0].Status  === 0) {
          this.edificios = JSON.parse(res).Datos;
          localStorage.setItem('edificioId', this.edificios[0].EdificioId.toString());
          this.datosService.edificioId = this.edificios[0].EdificioId.toString();
          this.setMenu(this.menu);
        } else {
            this.mensajesService.error('Error al cargar Ambito del usuario:' + JSON.parse(res).Status[0].Msg);
          }

      },
        error => { this.mensajesService.error(error); });
    }
}

