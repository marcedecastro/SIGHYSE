import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatosService } from './datos.service';
import {Region} from './../_Modelos/Region';
@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  public listaVisible: boolean;
  public datosVisible: boolean;
  public Lista: Region[];
  public titulos: String[];
  public campos;
  public instancia: Region;
  constructor(private ds: DatosService, private mensajesService: ToastrService) { }

  nuevaInstancia() {
    this.instancia = new Region();
   }
  getLista(columnas?: number[]|any) {
    let titulos;
    this.ds.getDatos('Regiones').subscribe(ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.Lista = JSON.parse(ped).Datos;
        titulos = this.ds.getTitulos( JSON.parse(ped).Titulos, columnas);
        this.titulos = titulos.titulos;
        this.campos = titulos.campos;
      } else {
          this.mensajesService.error(JSON.parse(ped).Status[0].Msg);
        }
      },
      error => this.mensajesService.error('ABM de Regions - obtener Regions', error)
    );
  }
  graba(Opcion: string) {



     return this.ds.grabaDatos('Region', Opcion, 'Region', 1, this.instancia);
  }



  _mostrarErrores(errores: any[]) {
    if (errores !== undefined) {
    for (let i = 1 ; i < errores.length; i++) {
      this.mensajesService.error(errores[i].Campo + ' [' + errores[i].CodError + '] ' + errores[i].Msg); }
    }
  }
}
