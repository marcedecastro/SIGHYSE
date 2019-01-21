import { Injectable } from '@angular/core';
import { DatosService } from './datos.service';
import { ToastrService } from 'ngx-toastr';
import {Rol} from './../_Modelos/rol';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public lista: Rol[];
  public listaTitulos: String[];
  public instancia: Rol;
  public listaVisible: boolean;
  public datosVisible: boolean;
  constructor(private ds: DatosService, private mensajesService: ToastrService) {
    this.listaVisible = true;
    this.datosVisible = false;
    this.getLista();
    this.nuevaInstancia();
   }

   nuevaInstancia() {
    this.instancia = new Rol();
   }

   getLista() {
/*
    const xDatos = [{'EdificioId': this.ds.edificioId, 'RubroId': this.ls.getTipoDoc().RubroId}];

    this.ds.getDatos('MatafuegoLista', xDatos).subscribe( ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.listaTitulos = JSON.parse(ped).Titulos;
        this.lista = JSON.parse(ped).Datos;

      } else {
        this.mensajesService.error('Error al obtener Roles : ' + JSON.parse(ped).Status[0].Msg);
      }
    },
    error => this.mensajesService.error('Lista de Roles', error) );*/
  }
}
