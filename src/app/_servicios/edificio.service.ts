import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatosService } from './datos.service';
import {Edificio} from './../_Modelos/Edificio';

@Injectable({
  providedIn: 'root'
})

export class EdificioService {
  public listaVisible: boolean;
  public datosVisible: boolean;
  public Lista: Edificio[];
  public titulos: String[];
  public campos;
  public instancia: Edificio;
  constructor(private ds: DatosService, private mensajesService: ToastrService) { }

  nuevaInstancia() {
    this.instancia = new Edificio();
   }
  getLista(columnas?: number[]|any) {
    let titulos;
    this.ds.getDatos('Edificios').subscribe(ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        this.Lista = JSON.parse(ped).Datos;
        titulos = this.ds.getTitulos( JSON.parse(ped).Titulos, columnas);
        this.titulos = titulos.titulos;
        this.campos = titulos.campos;
      } else {
          this.mensajesService.error(JSON.parse(ped).Status[0].Msg);
        }
      },
      error => this.mensajesService.error('ABM de Edificios - obtener edificios', error)
    );
  }

  graba(Opcion: string) {

    if (this.instancia.Estado) {
      this.instancia.Estado = 1;
    } else {
      this.instancia.Estado = 0;
    }

     return this.ds.grabaDatos('Edificios', Opcion, 'Edificios', 1, this.instancia);
  }

  borra() {
    let Datos = [];
    this.instancia.Estado = 3;
    this.ds.grabaDatos('Edificios', 'Graba', 'Edificios', 1, this.instancia).subscribe(ped => {
      if (JSON.parse(ped).Status[0].Status  === 0) {
        Datos = JSON.parse(ped).Datos; this.getLista();
        this.mensajesService.success('Edificio grabado correctamente');
      } else {
        this.mensajesService.error(JSON.parse(ped).Status[0].Msg); }
      },
      error => this.mensajesService.error('ABM de Edificios - grabar edificio', error)
    );
  }

  _mostrarErrores(errores: any[]) {
    if (errores !== undefined) {
    for (let i = 1 ; i < errores.length; i++) {
      this.mensajesService.error(errores[i].Campo + ' [' + errores[i].CodError + '] ' + errores[i].Msg); }
    }
  }
}
